export default function phoneFormatted(phone){
    let phoneCopy = phone.split('').reverse().join('');
    phoneCopy = phoneCopy.slice(0,2) + 
                '-' + 
                phoneCopy.slice(2,4) +
                '-' +
                phoneCopy.slice(4,7) +
                ' ' +
                phoneCopy.slice(7,10) +
                ' ' +
                phoneCopy.slice(10) +
                "+";
    return phoneCopy.split('').reverse().join('')
}