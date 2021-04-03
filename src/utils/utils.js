import moment from "moment";

export function formatFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + 'B';
    } else if (fileSize < (1024 * 1024)) {
        var temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return temp + 'KB';
    } else if (fileSize < (1024 * 1024 * 1024)) {
        // eslint-disable-next-line
        var temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'MB';
    } else {
        // eslint-disable-next-line
        var temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return temp + 'GB';
    }
}
export function timeFormat(timeString) {
    return moment(timeString).format("YYYY-MM-DD HH:MM:SS")
}

export function timeMinus(t) {
    var now = moment();
    var time = moment(t);

    var dura = moment.duration(now - time)
    var str = dura.days() + "天" + dura.hours() + '小时' + dura.minutes() + '分' + dura.seconds() + '秒'
    return str
}