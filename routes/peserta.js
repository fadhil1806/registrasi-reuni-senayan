const express = require('express')
const dataPesertaAcara = require('../models/pesertaAcaraReuni');
const responseHelpers = require('../helpers/responseHelper');
const generateId = require('../helpers/generateId');
const { sendMessage } = require('../whatsapp');
const router = express.Router()

router.get('/data/peserta', async(req, res) => {
    const data = await dataPesertaAcara.findAll();
    return responseHelpers(res, 200, data);
})


const names = [
    "Bambang Pamungkas",
    "Palupi",
    "BED",
    "Aty",
    "Aji Damar",
    "Ammy",
    "Yaya Haryadi",
    "Evi BS",
    "Betty",
    "Marmah Hadi",
    "Etty",
    "Dewi Karti",
    "Mudiatno",
    "Agus Yulianto",
    "Umami",
    "Irmansyah",
    "Lilik",
    "Retno",
    "Anna",
    "Yadi",
    "Dz",
    "Liana",
    "Endang K",
    "Dadang",
    "Sofyani",
    "Ade Rini",
    "M Heppy",
    "Hermin Rachim",
    "Yono",
    "Dewi Cia",
    "Haslinda",
    "Slamet Wiyardi",
    "Yuni Soraya",
    "Bambang Har",
    "Inne",
    "SENY",
    "Lanni",
    "Ishak A Wahyudi",
    "Achyar",
    "Enny Riri",
    "Bambang Widjajarso",
    "Margono",
    "Ruston Tambunan",
    "Dogom Harahap",
    "Made Sumadi Artha",
    "Dyah Yulianti",
    "Widya B Wahono",
    "Dina Herning",
    "Jeanny HV Hutauruk",
    "Dyah R A",
    "Naniek E",
    "Danang Widjayanto",
    "Sahat P",
    "Heru Subekti",
    "Adrin",
    "Yanuar Pribadi",
    "Melly",
    "Titriet",
    "Riptono",
    "Iriyadi",
    "Nuke",
    "Erman",
    "Ikhwan. S",
    "Gema Segara",
    "Bonardo H",
    "Sumiyati",
    "Ratih",
    "Trisyu",
    "Dewanto",
    "Bambang Setiono",
    "Gamot",
    "Gatot Trihargo",
    "Sistomo",
    "Duma",
    "Harry N",
    "Yayuk",
    "Bill Y",
    "Bambang Willy",
    "Budi Mulyono",
    "Eddy Sofyan",
    "M.Dian Ghozali",
    "Endi Syahrial",
    "Ahmad Helmi",
    "Syahril Asraf",
    "Budi Yuwono",
    "Teguh W",
    "Setiadi Kusuma",
    "Bambang S. Wirya",
    "Indra W",
    "SIHAR PANJAITAN"
  ];
  

router.post('/register/peserta', async(req, res) => {
    const {name} = req.body
    const data = await dataPesertaAcara.findOne({
        where: {name}
    })
    if(data) return responseHelpers(res, 400, {message: "Double Data"})
    try {
            const id = await generateId(30)
            await dataPesertaAcara.create({
                id, 
                name, status_pembayaran: 'Sudah Bayar', 
                status_hadir: 'Sudah Hadir', 
                waktu_hadir: new Date()
            })

            await sendMessage(name)

        return responseHelpers(res, 201, { message: 'Successfully created data peserta' });
    }
    catch(error) {
        console.log(error)
        return responseHelpers(res, 500, { message: 'Internal server error' });
    }
})

router.post('/confirm/pembayaran', async(req, res) => {
    const {name} = req.body
    try {
        await dataPesertaAcara.update({status_pembayaran: 'Sudah Bayar'}, {where: {name}})
        return responseHelpers(res, 200, { message: 'Successfully confirm peserta' });
    }
    catch {
        return responseHelpers(res, 500, { message: 'Internal server error' });
    }
})

router.post('/confirm/peserta', async(req, res) => {
    const { id } = req.body;

    try {
        // Mencari data peserta berdasarkan ID
        const data = await dataPesertaAcara.findOne({ where: { id } });

        // Jika data tidak ditemukan, kirim respons kesalahan
        if (!data) return responseHelpers(res, 404, { message: 'Peserta not found' });


        await sendMessage(data.name);

        await data.update({ status_pembayaran: 'Sudah Bayar',status_hadir: 'Hadir', waktu_hadir: new Date() });

        return responseHelpers(res, 200, { message: 'Successfully confirmed peserta' });
    } catch (error) {
        console.error(error); // Mencatat kesalahan jika ada
        return responseHelpers(res, 500, { message: 'Internal server error' });
    }
});

module.exports = router