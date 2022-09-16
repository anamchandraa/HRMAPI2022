const { poolconnect } = require("../../Database/config");

var CheckInOutservice = {
    FetchDataWithData: async (data) => {
        try {
            var query = `select [InTime],[EmployeeId] from Attendance_Attendance where [DayDate]= '${data}'`;
            console.log(query);
            var result = await poolconnect.request().query(query);
            return result;
        }
        catch (err) {
            console.log(err);
        }
    },
    InsertInTime: async (data) => {
        try {
            var data_ = {
                EmployeeId: data.EmployeeId,                
               
                IpAddrress: data.IpAddress,
                InLocation: data.InLocation,
                InShiftTime : data.InShiftTime
            }
            var datetime =  (await poolconnect.request().query(`select getdate() as DateTime`)).recordset[0].DateTime;
      
            var date = JSON.stringify(datetime).substring(1,11);
        
            var Time = JSON.stringify(datetime).substring(12,20);
            var workingday =  (await poolconnect.request().query(`select datename(dw,'${date}') as workingday`)).recordset[0].workingday
            

   
            var aa1 = Time.split(":");
            var aa2 =  JSON.stringify(data_.InShiftTime).substring(12,20).split(":");
            var d1 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa1[0], 10), parseInt(aa1[1], 10), parseInt(aa1[2], 10));
            var d2 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa2[0], 10), parseInt(aa2[1], 10), parseInt(aa2[2], 10));
            var InTime = d1.valueOf();
            var InshiftTime = d2.valueOf();

            if(InshiftTime<InTime){
                //half day
                var query = `Insert into Attendance_Attendance 
                ([EmployeeId]
                    ,[DayDate]
                    ,[WorkingDay]
                    ,[Inlocation]
                    ,[InTime]
                    ,[AttendanceType]
                    ,[CreatedAt]
                    ,[UpdatedAt]
                    ,[DStatus]
                    ,[Ipadderess])
                values 
                (
                    '${data_.EmployeeId}',
                    '${date}',               
                    '${workingday}',
                    '${data_.InLocation}',
                    '${Time}',
                    'HD',
                    getdate(),
                    getdate(),
                    'V',
                    '${data_.IpAddrress}'
                )`
                console.log(query);
                var result = await poolconnect.request().query(query);
                return result;
            }
            else {

            
            var query = `Insert into Attendance_Attendance 
            ([EmployeeId]
                ,[DayDate]
                ,[WorkingDay]
                ,[Inlocation]
                ,[InTime]
                ,[AttendanceType]
                ,[CreatedAt]
                ,[UpdatedAt]
                ,[DStatus]
                ,[Ipadderess])
            values 
            (
                '${data_.EmployeeId}',
                '${date}',               
                '${workingday}',
                '${data_.InLocation}',
                '${Time}',
                'P',
                getdate(),
                getdate(),
                'V',
                '${data_.IpAddrress}'
            )`
            console.log(query);
            var result = await poolconnect.request().query(query);
            return result;
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    InsertOutTime: async (data) => {
        try {
            var data_ = {
                Outlocation: data.OutLocation,                
                OutShiftTime: data.OutShiftTime
            }
            //var ans = new Date(`${Date}` + '10:20:45') > new Date('5/2/1999 ' + '15:10:10');
            var datetime =  (await poolconnect.request().query(`select getdate() as DateTime`)).recordset[0].DateTime;
            console.log(datetime);
            var date = JSON.stringify(datetime).substring(1,11);
            console.log(date);
            var Time = JSON.stringify(datetime).substring(12,20);
            console.log(Time);
            var aa1 = Time.split(":");
            // var aa2 = data_.OutShiftTime.split(":");
            var aa2 =  JSON.stringify(data_.OutShiftTime).substring(12,20).split(":");
            var d1 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa1[0], 10), parseInt(aa1[1], 10), parseInt(aa1[2], 10));
            var d2 = new Date(parseInt("2001", 10), (parseInt("01", 10)) - 1, parseInt("01", 10), parseInt(aa2[0], 10), parseInt(aa2[1], 10), parseInt(aa2[2], 10));
            var OutTime = d1.valueOf();
            var OutshiftTime = d2.valueOf();

            if(OutTime<OutshiftTime){
                //Half day
                var query = `Update Attendance_Attendance set
                [AttendanceType] = 'HD',            
                [OutTime]= '${Time}',
                [Outlocation] = '${data_.Outlocation}',
                [UpdatedAt] = getdate()  
                 where [DayDate] = '${date}'`
    
                console.log(query);
                var result = await poolconnect.request().query(query);
                return result;
            }
            else {
                var query = `Update Attendance_Attendance set
            
            [OutTime]= '${Time}',
            [Outlocation] = '${data_.Outlocation}',
            [UpdatedAt] = getdate()  
             where [DayDate] = '${date}'`
            console.log(query);
            var result = await poolconnect.request().query(query);
            return result;
            }          
        }
        catch (err) {
            console.log(err);
        }
    },
    GetShift: async (data) => {
        try {
            let query = `select [InShiftTime],[OutShiftTime] from Attendance_Employee where EmployeeId = '${data}'`;
            console.log(query);
            let response = await poolconnect.request().query(query);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    },
    GetAttendancedetailsByMonth : async(data)=>{
        try{
            var data_ = {
                EmployeeId : data.EmployeeId,
                MonthandYear : data.MonthandYear,                    
            }
            var arr = data_.MonthandYear.split("-");
            var query = `select [DayDate], [InTime] , [OutTime], [AttendanceType] from attendance_attendance where MONTH(DayDate)  = '${arr[1]}'  and YEAR(DayDate) = '${arr[0]}'`
            var response = await poolconnect.request().query(query);
            return response;
        }
        catch(err){
            console.log(err);
        }
    },
    GetAttendanceDetailsByAttendanceType : async(data)=>{
        try{
            var data_ = {
                EmployeeId : data.EmployeeId,
                MonthandYear : data.MonthandYear,
                AttendanceType : data.AttendanceType
            }
            var arr = data_.MonthandYear.split("-");
            var query = `select [DayDate], [InTime] , [OutTime], [AttendanceType] from attendance_attendance where MONTH(DayDate)  = '${arr[1]}'  and YEAR(DayDate) = '${arr[0]}' and AttendanceType = '${data_.AttendanceType}'`
            var response = await poolconnect.request().query(query);
            return response;


        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = CheckInOutservice;