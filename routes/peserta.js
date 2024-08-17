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


router.post('/register/peserta', async(req, res) => {
    const {name} = req.body
    const data = await dataPesertaAcara.findOne({
        where: {name}
    })
    if(data) return responseHelpers(res, 400, {message: "Double Data"})
    try {
            const id = await generateId(30)
            await dataPesertaAcara.create({
                id, name, status_pembayaran: 'Belum Bayar', status_hadir: 'Belum Hadir'
            })

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
    const {id} = req.body
    try {
        const data = await dataPesertaAcara.update({status_hadir: 'Hadir'}, {where: {id}})
        console.log(data)
        // const response = await sendMessage(data)
        return responseHelpers(res, 200, { message: 'Successfully confirm peserta' });
    }
    catch {
        return responseHelpers(res, 500, { message: 'Internal server error' });
    }
})

module.exports = router