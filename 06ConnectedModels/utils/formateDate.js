const formatDate = (() => {
    let timestamp = new Date();
    return {
        get formattedDate() {
        let day = timestamp.getDate();
        let month = timestamp.getMonth() + 1;
        let year = timestamp.getFullYear();
        let hours = timestamp.getHours();
        let minutes = timestamp.getMinutes();
        let seconds = timestamp.getSeconds();
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        }
    };
});
 module.exports = formatDate; // outputs the formatted date and time for the current timestamp
