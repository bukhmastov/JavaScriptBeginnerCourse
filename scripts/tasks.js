'use strict';

// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать – массив значений одного из полей (отсортированных в порядке возрастания):
// ------------------------

function getFieldValues(array, key) {
    if (typeof array != "object") return null;
    let result = [];
    array.forEach(function(item, i, arr) {
        if (item[key] != undefined) result.push(item[key]);
    });
    return result.sort();
}
let usersData = [
    {'user': 'Alex', 'password': 'MyNameIsAlex'},
    {'user': 'Bob',  'password': 'MyNAmeIsBob'}
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']

// ------------------------


// 2) Написать функцию, фильтрующую массив с использованием предиката:
// ------------------------

function isEven(x) {
    return typeof x == "number" && x % 2 == 0;
}
function filter(array, func) {
    if (typeof array != "object" || typeof func != "function") return null;
    return array.filter(func);
}
let numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, "Fg"];
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// ------------------------


// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках
// ------------------------

function findSimilarWords(str1, str2) {
    if (typeof str1 != "string" || typeof str2 != "string") return null;
    let result = [];
    let arr1 = str1.split(" ");
    let arr2 = str2.split(" ");
    arr1.forEach(function(item, i, arr) {
        if (~arr2.indexOf(item) && !~result.indexOf(item)) {
            result.push(item);
        }
    });
    return result;
}
let firstLongString = 'Load up on guns and bring your friends it is fun to lose and to pretend';
let secondLongString = 'She is over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and', 'is'];

// ------------------------


// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:
// ------------------------

function generateBroadcastAndNetworsAddresses(IpAddress, subnetMask) {
    if (typeof IpAddress != "string" || typeof subnetMask != "number") return null;
    let ip = IpAddress.split(".");
    let mask = [];
    // Ip verification
    if (ip.length != 4) {
        console.warn("IpAddress should contains 4 octets");
        return null;
    }
    if (ip.some(function(item) {
        let converted = +item;
        return item.length == 0 || isNaN(converted) || converted > 255 || converted < 0;
    })) {
        console.warn("IpAddress octets should be valid");
        return null;
    };
    // Parsing the mask
    while (subnetMask > 0) {
        let tmp = "";
        for (let i = 0; i < 8; i++) {
            tmp += --subnetMask >= 0 ? "1" : "0";
        }
        mask.push(parseInt(tmp, 2));
    }
    // Compute
    let getNetworkAddress = function(ip, mask) {
        let tmp = [];
        for (let i = 0; i < 4; i++) {
            tmp.push(ip[i] & mask[i]);
        }
        return tmp.join(".");
    }
    let getBroadcastAddress = function(ip, mask) {
        let invertBin = function(bin) {
            let significant = 0;
            let tmp = bin;
            while (tmp > 1) {
                tmp = tmp >> 1;
                significant = (significant << 1) | 1;
            }
            return ~bin & significant;
        }
        let tmp = [];
        for (let i = 0; i < 4; i++) {
            tmp.push(ip[i] | invertBin(mask[i]));
        }
        return tmp.join(".");
    }
    return "Broadcast - " + getBroadcastAddress(ip, mask) + ", Network - " + getNetworkAddress(ip, mask);
}
let IpAddress = '10.223.98.2';
let subnetMask = 28;
console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0

// ------------------------


// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// ------------------------

function makeItClean(array) {
    if (typeof array != "object") return null;
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result = result.concat(array[i]);
    }
    result = result.filter(function(item, pos) {
        return result.indexOf(item) == pos;
    });
    return result;
}
let totalMessArray = [
    ['a', 1, true], 
    [true, 99, 'aa', undefined], 
    ['1']
];
console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, '1', undefined, true];

// ------------------------
