//developer name  : Nisha Supyal
//

const createHttpError = require("http-errors");
const service_menu = require("../../Service/Dashboard/Menu");

class controller {
    //Code for Global Menu API starts from here
    async AttendanceGlobalMenu(req, res,next) {
        try {
            await service_menu.FetchGlobalMenus().then(async (response) => {
                if (response.length) {
                    return res.status(200).json({
                        code: '1',
                        message: " global menus fetched successfully",
                        data: response
                    })
                }
                else {
                    return next(createHttpError.InternalServerError("Internal server error"))
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    //code for global side bar APi
   
}
module.exports = controller;




