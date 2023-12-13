window.theme = window.theme || {};

theme.Collection = (function() {
  var settings = {
    mediaQueryMediumUp: '(min-width: ' + theme.breakpoints.medium + 'px)'
  };

  var selectors = {
    filterSelection: '#FilterTags',
    sortSelection: '#SortBy',
    selectInput: '[data-select-input]'
  };

  function Collection(container) {
    this.filterSelect = container.querySelector(selectors.filterSelection);
    this.sortSelect = container.querySelector(selectors.sortSelection);

    this.selects = document.querySelectorAll(selectors.selectInput);

    if (this.sortSelect) {
      this.defaultSort = this._getDefaultSortValue();
    }

    if (this.selects.length) {
      this.selects.forEach(function(select) {
        select.classList.remove('hidden');
      });
    }

    this.initBreakpoints = this._initBreakpoints.bind(this);

    this.mql = window.matchMedia(settings.mediaQueryMediumUp);
    this.mql.addListener(this.initBreakpoints);

    if (this.filterSelect) {
      this.filterSelect.addEventListener(
        'change',
        this._onFilterChange.bind(this)
      );
    }

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', this._onSortChange.bind(this));
    }

    theme.Helpers.promiseStylesheet().then(
      function() {
        this._initBreakpoints();
      }.bind(this)
    );
    this._initParams();


    var formsArr = container.querySelectorAll('[action="/cart/add"]');
    if(formsArr.length) {
      formsArr.forEach(function(form,index) {
        theme.AddItemToCart(form);

      });
    }
    theme.ProductItemSwatches();

    var sidebar_menu_items = container.querySelectorAll('.panel-heading.collapse');
    if(sidebar_menu_items.length) {
      sidebar_menu_items.forEach(function (item,index) {
        item.addEventListener('click',function (e) {
          e.preventDefault();

          
          var self = this;
          var panelId = item.getAttribute('data-collapse-panel');
          var itemPanel = document.querySelector('#'+panelId);

             for (let sibling of self.parentNode.children) {
        if (sibling !== self)  {
          if(sibling.classList.contains('active') && sibling.classList.contains('panel-heading') ) {
          sibling.dispatchEvent(new Event('click', { bubbles: true }));

          }
        }
          }
          
 

          if (!itemPanel.classList.contains('active')) {

            self.classList.add('active');
            itemPanel.classList.add('active');
            itemPanel.style.height = 'auto';
           var height = itemPanel.clientHeight + 'px';

            itemPanel.style.height = '0px';

            setTimeout(function () {
              itemPanel.style.height = height;
            }, 0);
                  setTimeout(function() {
                      itemPanel.style.height = 'auto';
          },300);

          } else {
   
        var height = itemPanel.clientHeight + 'px';

             itemPanel.style.height = height;
             setTimeout(function () {
              itemPanel.style.height = '0px';
            }, 0);
           

            itemPanel.addEventListener('transitionend', function () {
              itemPanel.classList.remove('active');
              self.classList.remove('active');
            }, {
              once: true
            });

          }

        });
      });
    }

    var filter_titles = container.querySelectorAll('.category-filters-section-title');
    if(filter_titles.length) {
      filter_titles.forEach(function(item,index) {



        var self = item;
        var parentArea = self.closest('.category-filters-area-section');
        var filtersBlock = parentArea.querySelector('.category-filters-area-list');

        if (filtersBlock.classList.contains('active')) {
          filtersBlock.style.height = 'auto';
          var height = filtersBlock.clientHeight + 'px';
          filtersBlock.style.height = height;
          setTimeout(function() {
                      filtersBlock.style.height = 'auto';
          },300);

        } else {
           filtersBlock.style.height = height;
           setTimeout(function() {
          filtersBlock.style.height = '0px';
           },300);
        }


        item.addEventListener('click', function(e) {
          e.preventDefault();

          var self = this;
          var parentArea = self.closest('.category-filters-area-section');
          var filtersBlock = parentArea.querySelector('.category-filters-area-list');
          
          if (!filtersBlock.classList.contains('active')) {

            self.classList.add('active');
            filtersBlock.classList.add('active');
            filtersBlock.style.height = 'auto';

            var height = filtersBlock.clientHeight + 'px';

            filtersBlock.style.height = '0px';

            setTimeout(function () {
              filtersBlock.style.height = height;
            }, 0);
             setTimeout(function() {
                      filtersBlock.style.height = 'auto';
          },300);

          } else {

              var height = filtersBlock.clientHeight + 'px';
             filtersBlock.style.height = height;
               setTimeout(function () {
              filtersBlock.style.height = '0px';
            }, 0);
            
            self.classList.remove('active');
            filtersBlock.classList.remove('active');

          }
        });
      });
    }

    var show_more_options = container.querySelectorAll('.show_more_options');
    if(show_more_options.length) {

      container.querySelectorAll('.advanced-filters').forEach(function(filter,index) {
        var children_length = filter.querySelectorAll('li').length;
        if(children_length > 5) {

          var heigth_limit = 0;
          for(var i=0; i < filter.querySelectorAll('li').length; i++) {
            var item = filter.querySelectorAll('li')[i];
            heigth_limit = heigth_limit + item.offsetHeight;
            if(i == 4) {
              break;
            }
          }

          var show_more_option = filter.nextElementSibling;
          if(show_more_option) {
            filter.setAttribute('data-heigth_limit', heigth_limit);
            filter.style.maxHeight = heigth_limit+'px';
            show_more_option.style.display = 'inline-block';
          }
        }
      });

      show_more_options.forEach(function (btn,index) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();

          var filters_list = this.previousElementSibling;
          var heigth_limit = filters_list.getAttribute('data-heigth_limit');
          var default_text = this.getAttribute('data-default-text');

          if(this.classList.contains("openedFilter")) {    
            filters_list.style.maxHeight  = heigth_limit+'px';
            this.classList.remove('openedFilter');
            this.innerHTML = default_text;
          } else {

            var filterBlockLength = 0;
            for(var i=0; i < filters_list.querySelectorAll('li').length; i++) {
              var item = filters_list.querySelectorAll('li')[i];
              filterBlockLength = filterBlockLength + item.offsetHeight;
            }
            filters_list.style.maxHeight = filterBlockLength+'px';
            this.classList.add('openedFilter');
            this.innerHTML = theme.strings.show_less;

          }
        });
      });
    };


    var change_layout_btns = container.querySelectorAll('[data-action="change-layout"]'); 
    if(change_layout_btns.length) {
      change_layout_btns.forEach(function(item,index) {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          var this_btn = this;

          if (this_btn.classList.contains('is-selected')) {
            return;
          }

          var button_parent = this_btn.closest('.filters-toolbar');

          var newLayoutMode = this_btn.getAttribute('data-layout-mode');

          // We save the new attribute so that we can select the appropriate mode without causing reflow
          fetch(window.routes.cartUrl + '/update.js', {
            body: JSON.stringify({
              attributes: {
                'collection_layout': newLayoutMode
              }
            }),
            credentials: 'same-origin',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
            }
          });

          button_parent.querySelector('.collection__layout-button.is-selected').classList.remove('is-selected');
          this_btn.classList.add('is-selected');
          var collectionWrappers = document.querySelectorAll('.Collection-wrapper');
          if(collectionWrappers.length) {
            collectionWrappers.forEach(function (collectionWrapper,index) {
              collectionWrapper.querySelectorAll('.product-item-block').forEach(function (productBlock,index) {

                if (newLayoutMode === 'grid') {
                  productBlock.classList.remove('view-mode-list');
                  productBlock.classList.add('view-mode-grid');
                } else {
                  productBlock.classList.add('view-mode-list');
                  productBlock.classList.remove('view-mode-grid');
                }
              });
            });
          }
        });
      });
    }


    var pagination_mode = container.getAttribute('data-pagination_mode');
    if(pagination_mode != 'standart') {
      var endlessScroll = new Ajaxinate({
        container: '#AjaxinateContainer',
        pagination: '#AjaxinatePagination',
        method: pagination_mode,
        offset: 500
      });
    }

    var open_sidebar_btn  = container.querySelector('.open_mobile_sidebar');
    var close_sidebar_btn = container.querySelector('.close-collection-sidebar');
    if(open_sidebar_btn) {
      open_sidebar_btn.addEventListener('click', function(e) {
        e.preventDefault();
        var sidebarEl =  container.querySelector('.collection-sidebar');
        if(sidebarEl) {
          sidebarEl.classList.add('show');
          document.querySelector('body').classList.add('show_overlay');
        }
      });
    }
    if(close_sidebar_btn) {
      close_sidebar_btn.addEventListener('click', function(e) {
        e.preventDefault();
        var sidebarEl =  container.querySelector('.collection-sidebar');
        if(sidebarEl) {
          sidebarEl.classList.remove('show');
          document.querySelector('body').classList.remove('show_overlay');
        }
      });
    }


    var check_filter_value_btns = container.querySelectorAll('.advanced-filter a');
    if(check_filter_value_btns.length) {
      check_filter_value_btns.forEach(function (item,index) {
        item.addEventListener('click',function (e) {
          e.preventDefault();
          var parentFilterNode = this.closest('.advanced-filter');
          var filterInput = parentFilterNode.querySelector('[type="checkbox"]');
          if(filterInput) {
            if(filterInput.checked) {
              filterInput.checked = false;
            } else {
              filterInput.checked = true;
            }
          }


          var FitersFormEl = item.closest('form');
          if(FitersFormEl) {
            const formData = new FormData(FitersFormEl);

            const searchParams = new URLSearchParams(formData).toString();
            var pathname  = window.location.pathname;

            window.location.href = pathname + "?" + searchParams;
          } else {

            var href = this.getAttribute('href');
            var pathname  = window.location.pathname;
            var search_url_size = window.location.search.length;
            if(search_url_size) {
              window.location.href = href + window.location.search;
            } else {
              window.location.href = href ;
            }
          }


        });
      });
    }


    var group__price_rangeBlocks = container.querySelectorAll('.filter-group-display__price-range-input');  
    if(group__price_rangeBlocks.length) {
      document.addEventListener('change', function(e){
        var el = e.target;

        if(el.classList.contains('filter-group-display__price-range-input')) {
          var FitersFormEl = el.closest('form');
          if(FitersFormEl) {
            const formData = new FormData(FitersFormEl);

            const searchParams = new URLSearchParams(formData).toString();
            var pathname  = window.location.pathname;
            window.location.href = pathname + "?" + searchParams;
          }	

        }
      });
    }
    var price_range_inputs =  container.querySelectorAll('.price_range'); 
    if(price_range_inputs.length) {
      document.addEventListener('change', function(e){
        var el = e.target;

        if(el.classList.contains('price_range')) {
          var FitersFormEl = el.closest('form');
          if(FitersFormEl) {

            var prices_arr = [];
            var price_range_inputs = FitersFormEl.querySelectorAll('.filter-group-display__price-range-input');
            var price_range_container = el.closest('.price_range_container');
            if(price_range_container) {
              price_range_container.querySelectorAll('.price_range').forEach(function(item,index) {
                var input_val = item.value * 1;
                prices_arr.push(input_val);
              });
              if(price_range_inputs.length) {
                var min = Math.min.apply(null, prices_arr),
                    max = Math.max.apply(null, prices_arr);
                price_range_inputs[0].value = min;
                price_range_inputs[1].value = max;
              }
            }

            const formData = new FormData(FitersFormEl);
            const searchParams = new URLSearchParams(formData).toString();
            var pathname  = window.location.pathname;
            window.location.href = pathname + "?" + searchParams;
          }	

        }
      });
    }

    var active_titles_arr =  container.querySelectorAll('.category-filters-section-title.active');

      if(active_titles_arr.length) { 
        if(window.innerWidth < 750) {
          active_titles_arr.forEach(function (title,index) {
            title.dispatchEvent(new Event('click', { bubbles: true }));
          });
        }
      }
    
  }

  Collection.prototype = Object.assign({}, Collection.prototype, {
    _initBreakpoints: function() {
      if (this.mql.matches) {
        slate.utils.resizeSelects(this.selects);
      }
    },

    _initParams: function() {
      this.queryParams = {};
      if (location.search.length) {
        var aKeyValue;
        var aCouples = location.search.substr(1).split('&');
        for (var i = 0; i < aCouples.length; i++) {
          aKeyValue = aCouples[i].split('=');
          if (aKeyValue.length > 1) {
            this.queryParams[
              decodeURIComponent(aKeyValue[0])
            ] = decodeURIComponent(aKeyValue[1]);
          }
        }
      }
    },

    _onSortChange: function() {
      this.queryParams.sort_by = this._getSortValue();

      if (this.queryParams.page) {
        delete this.queryParams.page;
      }

      window.location.search = decodeURIComponent(
        new URLSearchParams(Object.entries(this.queryParams)).toString()
      );
    },

    _onFilterChange: function() {
      document.location.href = this._getFilterValue();
    },

    _getFilterValue: function() {
      return this.filterSelect.value;
    },

    _getSortValue: function() {
      return this.sortSelect.value || this.defaultSort;
    },

    _getDefaultSortValue: function() {
      return this.sortSelect.dataset.defaultSortby;
    },

    onUnload: function() {

      function clearLayoutSettings() {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var request = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ attributes: { 'collection_layout': '' } })
        };
        fetch('/cart/update.js', request)
        .then(function(response) {
        });
      }
      clearLayoutSettings();

      if (this.filterSelect) {
        this.filterSelect.removeEventListener('change', this._onFilterChange);
      }

      if (this.sortSelect) {
        this.sortSelect.removeEventListener('change', this._onSortChange);
      }

      this.mql.removeListener(this.initBreakpoints);



    }
  });

  return Collection;
})();


document.addEventListener('DOMContentLoaded', function() {
  var sections = new theme.Sections();
  sections.register('collection-template', theme.Collection);
});