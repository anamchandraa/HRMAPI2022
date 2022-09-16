const { poolconnect } = require("../../Database/config");

var service_menu = {
    FetchGlobalMenus: async function () {
        try {
            let query =  ` select g.MenuId , g.MenuName ,g.MenuImage , g.Orderno,s.SubMenuId, s.SubMenuName , s.SubMenuImage,s.SubMenuOrderno,s.SubMenuUrl from [AttendanceGlobalManu] as g inner join [AttendanceSubMenu] s on g.MenuId = s.GlobalMenuId `;
            const response = await poolconnect.request().query(query);
            console.log(response);
            function mergeSubmenus(arr) {
                return Object.values(arr.reduce((acc, { MenuId, MenuName, MenuImage, Orderno, ...rest }) => {
                    const obj = acc[MenuId] ?? { MenuId, MenuName, MenuImage, Orderno, submenus: [] };
                    obj.submenus.push(rest)
                    acc[MenuId] = obj;
                    return acc;
                }, {}));
            }
            const result = mergeSubmenus(response.recordset);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    },
}
module.exports = service_menu;