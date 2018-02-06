
// version 1
//seo
var ids = {
  "860884": ["3237725241","(323) 772-5241"],
  "35540" : ["2069009549", "(206) 900-9549"],
  "138249" : ["3462014429","(346) 201-4429"]
};
//sem
var ids = {
  "860884": ["3239243549","(323) 924-3549"],
  "35540" : ["2069815387", "(206) 981-5387"],
  "138249" : ["3462072877","(346) 207-2877"]
};
//display
var ids = {
  "860884": ["3234552473","(323) 455-2473"],
  "35540" : ["2068232693", "(206) 823-2693"],
  "138249" : ["3462140877","(346) 214-0877"]
};

var lawyerId = $('.card.gtm-context.overridable-lawyer-phone').get(0).dataset.lawyerId;
var formattedNumber = $("div[data-gtm-context='profile hero'] .overridable-lawyer-phone-copy").get(0).innerText;
if(ids.hasOwnProperty(lawyerId)){
  //change href attr in lawyer card
  Array.from($(".js-v-phone-replace-link.js-v-profile-card-cta-phone.overridable-lawyer-phone-link"))
    .forEach(function(item){
      var unformattedNumber = item.href.substr(4);
      item.href = "tel:" + ids[lawyerId][0];
      var hash = JSON.parse($('.js-map-container .js-v-phone-replace-link').get(0).dataset.gtm);
      hash.target_url = "tel:" + ids[lawyerId][0];
      hash.target_path = ids[lawyerId][0];
      hash.link_text = ids[lawyerId][1];
      item.dataset.gtm = JSON.stringify(hash);
    }
  );
  //change phone number text in lawyer card
  Array.from($("div[data-gtm-context='profile hero'] .overridable-lawyer-phone-copy")).forEach(function(item){ item.innerText = ids[lawyerId][1];});

  Array.from($(".js-address-container .js-v-phone-replace-link"))
    .forEach(function(item) {
      var unformattedNumber = item.href.substr(4);
      item.href = "tel:" + ids[lawyerId][0];
      var hash = JSON.parse($('.js-map-container .js-v-phone-replace-link').get(0).dataset.gtm);
      hash.target_url = "tel:" + ids[lawyerId][0];
      hash.target_path = ids[lawyerId][0];
      hash.link_text = ids[lawyerId][1];
      item.dataset.gtm = JSON.stringify(hash);
    }
  );

  Array.from($(".js-address-container .js-v-phone-replace-link span")).forEach(function(item) {
    if (item.innerText === formattedNumber.trim()){
      item.innerText = ids[lawyerId][1];
    }
  });
}


// version 2

$(document).ready(function() {

  var ids = {
    "860884": ["3239243186","(323) 924-3186"],
    "35540" : ["2062081258", "(206) 208-1258"],
    "138249" : ["3464441827","(346) 444-1827"]
  };

  var lawyerId = $('.card.gtm-context.overridable-lawyer-phone').get(0).dataset.lawyerId;
  window.Cookies.remove("phone_" + lawyerId);
  window.provisioned_phone = undefined;
  $('.v-js-provisioned-phone').get(0).remove();
  var formattedNumber = $("div[data-gtm-context='profile hero'] .overridable-lawyer-phone-copy").get(0).innerText;

  if(ids.hasOwnProperty(lawyerId)){
    var newUnformattedNbr = ids[lawyerId][0];
    var newFormattedNbr = ids[lawyerId][1];

    var phoneLinks = $('a[href^="tel:"].overridable-lawyer-phone-link');
    phoneLinks.each(function(i, link){
      if(!link.closest("#recent-lawyers-carousel")){
        link.href = "tel:" + newUnformattedNbr;

        var copyElement = $(link).find('.overridable-lawyer-phone-copy')[0];
        if(copyElement){
          $(copyElement).text(newFormattedNbr);
        }

        var gtmData = $(link).attr('data-gtm');
        if(gtmData){
          var gtmJson = JSON.parse(gtmData);
          gtmJson.target_url = "tel:" + newUnformattedNbr;
          gtmJson.target_path = newUnformattedNbr;
          gtmJson.link_text = newFormattedNbr;
          $(link).attr('data-gtm', JSON.stringify(gtmJson));
        }
      }
    });
    Array.from($(".js-address-container .js-v-phone-replace-link"))
      .forEach(function(item) {
        var parent = $(item).parent('span')[0];
        if ($(parent).attr('itemprop') != 'faxNumber') {
          var copyElement = $(item).find(".js-v-phone-replace-text")[0];
          if(copyElement){
            $(copyElement).text(newFormattedNbr);
          }
          item.href = "tel:" + ids[lawyerId][0];
          var gtmData = $(item).attr('data-gtm');
          if(gtmData){
            var gtmJson = JSON.parse(gtmData);
            gtmJson.target_url = "tel:" + newUnformattedNbr;
            gtmJson.target_path = newUnformattedNbr;
            gtmJson.link_text = newFormattedNbr;
            $(item).attr('data-gtm', JSON.stringify(gtmJson));
          }
        }
      }
    );
  }
});
