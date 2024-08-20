const culinaryModel = require('../models/culinaryModel')
const crypto = require('crypto')

const createCulinary = async (req, res) => {
    try {
        const { name_culinary, island, icon, thumbnail, lat, long, address, link } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')
        const newCulinary = new culinaryModel({
            culinary_id: tokenRandom,
            name_culinary,
            island,
            icon,
            lat: parseFloat(lat),
            long: parseFloat(long),
            address,
            link,
            thumbnail,
        })

        await newCulinary.save()
        return res.json({ status: 200, message: 'Berhasil Tambah Wisata!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllCulinary = async (req, res) => {
    try {

        const existCulinary = await culinaryModel.find()
        
        if(!culinaryModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existCulinary })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateCulinary = async (req, res) => {
    try {
        const { culinary_id } = req.params
        const { name_culinary, lat, island, icon, long, address, link, thumbnail } = req.body

        const existCulinary = await culinaryModel.findOne({ culinary_id })
        if(!existCulinary) return res.json({ status: 404, message: 'Data tidak ada!' })

        existCulinary.name_culinary = name_culinary
        existCulinary.lat = lat
        existCulinary.long = long
        existCulinary.island = island
        existCulinary.icon = icon
        existCulinary.address = address
        existCulinary.link = link
        existCulinary.thumbnail = thumbnail
        existCulinary.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeCulinary = async (req, res) => {
    try {
        
        const { culinary_id } = req.params

        const existCulinary = await culinaryModel.findOneAndDelete({ culinary_id })
        if(!existCulinary) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existCulinary })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createCulinary,
    updateCulinary,
    removeCulinary,
    getAllCulinary,
}