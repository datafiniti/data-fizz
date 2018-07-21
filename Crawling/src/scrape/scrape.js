const cheerio = require('cheerio');
const dataConfig = require('../data/dataConfig');

const scrape = (data) => {
  const $ = cheerio.load(data);

//can't take credit for this function. see:
// https://stackoverflow.com/questions/11347779/jquery-exclude-children-from-text
  $.fn.ignore = function (sel) {
    return this.clone().find(sel || '>*').remove().end();
  };

  //ugly, lot's of formatting carried out on data to make it presentable
  const name = $('#productTitle').text().trim();
  const listPrice = parseFloat(($('span.a-color-base:nth-child(3)>span:nth-child(1)').text().trim()).substring(1));
  const description = $('#bookDescription_feature_div').ignore('div').text().replace(/\n|\t|<[^>]*>/g, '').trim();
  const dimensions = sanitize($("td.bucket>div:nth-child(2)>ul:nth-child(1)>li:contains('Product')").text().replace(/\n/g, '')).trim();
  const imageURL = $('#imgBlkFront').attr('src');
  const weightInit = $("td.bucket>div:nth-child(2)>ul:nth-child(1)>li:contains('Weight')").text().trim();
  const weightFinal = weightInit.substring(
    weightInit.lastIndexOf(':') + 1,
    weightInit.lastIndexOf('('),
  );

  const scrapedData = (
    {
      name,
      listPrice,
      description,
      dimensions,
      weight: weightFinal,
      imageURL,
    });
  dataConfig.bookData.push(scrapedData);
};

const sanitize = str => str.split(':')[1];

module.exports = scrape;
