'use strict';

/**
 * 生成n维环形坐标
 * @param {number} n 维度 
 * @param {number} cell 单位坐标长度 
 */
function generateCirclePath(n, cell) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push([i * cell, 0]);
  }
  for (var _i = 0; _i < n - 1; _i++) {
    arr.push([(n - 1) * cell, (_i + 1) * cell]);
  }
  for (var _i2 = 0; _i2 < n - 1; _i2++) {
    arr.push([(n - _i2 - 2) * cell, (n - 1) * cell]);
  }
  for (var _i3 = 0; _i3 < n - 2; _i3++) {
    arr.push([0, (n - _i3 - 2) * cell]);
  }
  return arr;
}

/**
 * 环形随机轨道运动函数
 * @param {element} el 运动的dom元素 
 * @param {array} path 运动的环形坐标集合
 * @param {number} n 维度 
 * @param {number} speed 运动的初始速度
 * @param {number} i 运动的初始位置
 * @param {number} len 路径的长度
 * @param {number} random 中奖坐标
 */
function run(el, path) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60;
  var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var len = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : path.length;
  var random = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Math.floor(Math.random() * len);

  setTimeout(function () {
    if (n > 0) {
      // 如果n为1，则设置中将数值
      if (n === 1) {
        len = random;
      }
      if (len <= i) {
        i = n === 1 ? len : 0;
        n--;
        speed += (300 - speed) / n;
      }
      el.css('transform', 'translate(' + path[i][0] + 'px, ' + path[i][1] + 'px)');
      run(el, path, n, speed, ++i, len, random);
    }
  }, speed);
}

// 防抖函数，避免频繁点击执行多次函数
function debounce(fn) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var timeout = null;
  return function () {
    var _this = this,
        _arguments = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, interval);
  };
}

// 点击开始按钮，开始抽奖
$('.start').on('click', debounce(function () {
  run($('.spin'), generateCirclePath(3, 100), 3);
}));