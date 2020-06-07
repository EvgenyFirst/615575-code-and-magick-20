'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var TABLE_HEIGHT = 100;
var TABLE_WIDTH = 10;

var BG_VERTICAL = 10;
var BG_HORISONTAL = 10;

var SHADOW_VERTICAL = TABLE_HEIGHT + BG_VERTICAL;
var SHADOW__HORISONTAL = TABLE_WIDTH + BG_HORISONTAL;

var COLUMN_WIDTH = 40;

var GRAPH_HEIGHT = 150;

var TEXT_HORISONTAL = 155;
var TEXT_WE_WINNER_VERTICAL = 28;
var TEXT_RESULT_WIN_VERTICAL = 45;
var TEXT_GAMERS_WIN_VERTICAL = 255;
var SPACE_BETWEEN_COLUMNS = 50;
var COLUMN_RESULTS = COLUMN_WIDTH + SPACE_BETWEEN_COLUMNS;
var LOCATION_OF_POINTS_VERTICAL = 70;

var WIN_RESULT_FONTS = '16px PT Mono';
var TEXT_COLOR = 'rgb(0, 0, 0)';
var BG_COLOR_TABLE = 'rgb(255, 255, 255)';
var COLUMN_COLOR_YOU = 'rgba(255, 0, 0, 1)';
var BG_COLOR_SHADOW_TABLE = 'rgba(0, 0, 0, 0.7)';

var getRandomOpacity = function () {
  return 'hsl(240, 100%, 50%, ' + Math.random() + ')';
};

var renderCloud = function (ctx) {
  ctx.fillStyle = BG_COLOR_SHADOW_TABLE;
  ctx.fillRect(SHADOW_VERTICAL, SHADOW__HORISONTAL, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = BG_COLOR_TABLE;
  ctx.fillRect(TABLE_HEIGHT, TABLE_WIDTH, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = WIN_RESULT_FONTS;

  ctx.fillText('Ура вы победили!', TEXT_HORISONTAL, TEXT_WE_WINNER_VERTICAL);
  ctx.fillText('Список результатов:', TEXT_HORISONTAL, TEXT_RESULT_WIN_VERTICAL);

  return;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getResultColumns = function (ctx, names, times) {
  renderCloud(ctx);

  for (var i = 0; i < times.length; i++) {

    var colorColumns = names[i] === 'Вы' ? COLUMN_COLOR_YOU : getRandomOpacity();
    var value = GRAPH_HEIGHT / getMaxElement(times);
    var columnHeight = value * times[i];
    var columnX = i * COLUMN_RESULTS + TEXT_HORISONTAL;
    var distanceTopColumn = COLUMN_RESULTS + (GRAPH_HEIGHT - columnHeight);

    ctx.fillStyle = colorColumns;
    ctx.fillRect(columnX, distanceTopColumn, COLUMN_WIDTH, columnHeight);

    var columnName = columnX;

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = WIN_RESULT_FONTS;
    ctx.fillText(names[i], columnName, TEXT_GAMERS_WIN_VERTICAL);

    var gameTime = LOCATION_OF_POINTS_VERTICAL + (TEXT_HORISONTAL - columnHeight);

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = WIN_RESULT_FONTS;
    ctx.fillText(Math.round(times[i]), i * COLUMN_RESULTS + TEXT_HORISONTAL, gameTime);
  }
};

window.renderStatistics = function (ctx, names, times) {

  getResultColumns(ctx, names, times);

};
