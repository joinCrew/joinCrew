export const  getCurrentDate = (temp : Date)=>{
    temp.setDate(temp.getDate());
    let year = temp.getFullYear();
    let month = ('0' + (temp.getMonth()+1)).slice(-2);
    let day = ('0' + temp.getDate()).slice(-2);

    let dateString = year + '-' + month  + '-' + day;
    let hours = ('0' + temp.getHours()).slice(-2); 
    let minutes = ('0' + temp.getMinutes()).slice(-2);
    let seconds = ('0' + temp.getSeconds()).slice(-2); 
    
    let timeString = hours + ':' + minutes  + ':' + seconds;
    return dateString
}