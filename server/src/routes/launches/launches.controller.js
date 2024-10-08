const {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    isExistsLaunch,
} = require('../../models/launches.model')
const { getPagination } = require('../../services/query')

async function httpGetAllLaunches(req, res) {
    const { offset, limit } = getPagination(req.query)

    return res.status(200).json(await getAllLaunches(offset, limit))
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }

    launch.launchDate = new Date(launch.launchDate).valueOf()

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }

    await scheduleNewLaunch(launch)

    res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    if (!isExistsLaunch(launchId)) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    const aborted = abortLaunch(launchId)

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }

    return res.status(200).json({
        ok: true,
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
