const getNextDate= (nowDate)=>{
    let temp = nowDate.split(" ");
    nowDate = new Date(temp[0]);
    nowDate.setDate(nowDate.getDate() + 1);
    let year = nowDate.getFullYear();
    let month = ('0' + (nowDate.getMonth() + 1)).slice(-2);
    let day = ('0' + nowDate.getDate()).slice(-2);

    let dateString = year + '-' + month  + '-' + day;

    dateString += " 00:00:00";
    return dateString;
}


module.exports = getNextDate;