const getNextDate= (nowDate)=>{
    let temp = new Date(nowDate);
    temp.setDate(temp.getDate() + 1);
    let year = temp.getFullYear();
    let month = ('0' + (temp.getMonth() + 1)).slice(-2);
    let day = ('0' + temp.getDate()).slice(-2);

    let dateString = year + '-' + month  + '-' + day;
    dateString += " 00:00:00";
    return dateString;
}


module.exports = getNextDate;
