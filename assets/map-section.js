window.theme = window.theme || {};

theme.Maps = (function() {
  var config = {
    zoom: 14

  };
  var apiStatus = null;
  var mapsToLoad = [];

  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };

  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };


  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function() {
    if (!Shopify.designMode) {
      return;
    }

    document.querySelector(selectors.section).classList.add(classes.mapError);
    document.querySelector(selectors.map).remove();
    document
    .querySelector(selectors.mapOverlay)
    .insertAdjacentHTML(
      'afterend',
      '<div class="' +
      classes.errorMsg +
      '">' +
      theme.strings.authError +
      '</div>'
    );
  };

  function Map(container) {
    this.map = container.querySelector(selectors.map);
    if (!this.map) return;
    this.key = this.map.dataset.apiKey;

    if (typeof this.key === 'undefined') {
      return;
    }

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          theme.Helpers.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + this.key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    mapsToLoad.forEach(function(map) {
      map.createMap();
    });
  }

  function geolocate(map) {
    return new Promise(function(resolve, reject) {
      var geocoder = new google.maps.Geocoder();
      var address = map.dataset.addressSetting;

      geocoder.geocode({ address: address }, function(results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          reject(status);
        }

        resolve(results);
      });
    });
  }

  Map.prototype = Object.assign({}, Map.prototype, {
    createMap: function() {
      return geolocate(this.map)
      .then(
        function(results) {
                    
          var stylesArr;


          if(document.querySelector(selectors.section)) {
            config.map_style = document.querySelector(selectors.section).getAttribute('data-map_style');
          }          
          
          if(config.map_style  == 'dark') {
            stylesArr = [
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "saturation": 36
                  },
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 40
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "visibility": "on"
                  },
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 16
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 20
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 17
                  },
                  {
                    "weight": 1.2
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 20
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 21
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 17
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 29
                  },
                  {
                    "weight": 0.2
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 18
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 16
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 19
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  },
                  {
                    "lightness": 17
                  }
                ]
              }
            ];
          } else {
            stylesArr = [
              {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "color": "#878787"
                  }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  {
                    "color": "#f9f5ed"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                  {
                    "color": "#f5f5f5"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#c9c9c9"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                  {
                    "color": "#aee0f4"
                  }
                ]
              }
            ];
          }
          
          var mapOptions = {
            zoom: config.zoom,
            center: results[0].geometry.location,
            draggable: false,
            clickableIcons: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            disableDefaultUI: true,
            styles: stylesArr
          };

          var map = (this.map = new google.maps.Map(this.map, mapOptions));
          var center = (this.center = map.getCenter());

          //eslint-disable-next-line no-unused-vars
          var marker = new google.maps.Marker({
            map: map,
            position: map.getCenter()
          });

          google.maps.event.addDomListener(
            window,
            'resize',
            theme.Helpers.debounce(
              function() {


                google.maps.event.trigger(map, 'resize');
                map.setCenter(center);
              }.bind(this),
              250
            )
          );
        }.bind(this)
      )
      .catch(
        function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = errors.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = errors.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              errorMessage = errors.authError;
              break;
            default:
              errorMessage = errors.addressError;
              break;
          }

          // Show errors only to merchant in the editor.
          if (Shopify.designMode) {
            this.map.parentNode.classList.add(classes.mapError);
            this.map.parentNode.innerHTML =
              '<div class="' +
              classes.errorMsg +
              '">' +
              errorMessage +
              '</div>';
          }
        }.bind(this)
      );
    },

    onUnload: function() {
      if (this.map) {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  });

  return Map;
})();

document.addEventListener('DOMContentLoaded', function() {
  var sections = new theme.Sections();
  sections.register('map', theme.Maps);
});