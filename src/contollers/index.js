/**
 * addValue controller
 *
 * @export
 * @param {any} request
 * @param {any} response
 * @param {any} next
 */
exports.addValue = (req, res, next) => {
    try {
        res.status(200).send({
            data: 'Value added',
            status: 'success',
        });
    } catch (err) {
        res.status(404).send({
            message: err.message,
            status: 'failure',
        });
    }
};