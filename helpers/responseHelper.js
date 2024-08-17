async function responseHelpers(res, httpCode, data = null) {
    return res.status(httpCode).json(data)
}
module.exports = responseHelpers