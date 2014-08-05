Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

funcky = require('funcky.util')

Models =
  List: require '../../models/facets/list'

bodyTpl = require '../../../jade/facets/list.body.jade'
optionTpl = require '../../../jade/facets/list.option.jade'

class ListFacetOptions extends Backbone.View

  className: 'container'

  # ### Initialize
  initialize: (options) ->
    @config = options.config
    @facetName = options.facetName

    @showingCursor = 0
    @showingIncrement = 50

    @listenTo @collection, 'sort', => @rerender()

    optionTpl = @config.get('templates')['list.option'] if @config.get('templates').hasOwnProperty 'list.option'

    @render()

  # ### Render
  render: ->
    bodyTpl = @config.get('templates')['list.body'] if @config.get('templates').hasOwnProperty 'list.body'
    @$el.html bodyTpl facetName: @facetName

    # Set the height of the <ul> dynamically, to prevent glitches
    # when the options are rendered on scrolling.
    # ul.style.height =  (@filtered_items.length * 15) + 'px'

    @appendOptions()

    @

  rerender: ->
    tpl = ''

    i = 0
    model = @collection.at(i)
    visible = model?.get('visible') # Sometimes, collections are empty

    while visible
      tpl += optionTpl option: model
      i = i + 1
      model = @collection.at(i)
      visible = if model? and model.get('visible') then true else false

    @el.querySelector('ul').innerHTML = tpl

  appendOptions: (all=false) ->
    # If true is passed as argument, all options are added.
    @showingIncrement = @collection.length if all

    tpl = ''

    while @showingCursor < @showingIncrement and @showingCursor < @collection.length
      model = @collection.at(@showingCursor)
      model.set 'visible', true
      tpl += optionTpl option: model
      @showingCursor = @showingCursor + 1

    @$('ul').append tpl

  renderAll: ->
    # When all models are set to visible, the collection is sorted and
    # @rerender is called.
    @collection.setAllVisible()

  # ### Events
  events: ->
    'click li': 'checkChanged'
    'scroll': 'onScroll'

  # When scolling lazy render the rest of the options. This speeds up page load.
  onScroll: (ev) ->
    if @showingCursor < @collection.length
      target = ev.currentTarget
      topPerc = target.scrollTop / target.scrollHeight

      if topPerc > (@showingCursor/2)/@collection.length
        @showingIncrement += @showingIncrement
        @appendOptions()

  checkChanged: (ev) ->
    $target = $ ev.currentTarget
    id = $target.attr 'data-value'

    isChecked = $target.attr('data-state') is 'checked'
    $target.attr 'data-state', if isChecked then 'unchecked' else 'checked'
    isChecked = $target.attr('data-state') is 'checked'

    @collection.get(id).set 'checked', isChecked

    # If there are no checked options or autoSearch is off (false), then triggerChange,
    # otherwise (autoSearch is true and there are options checked), set a 1s timeout to
    # give the user time to check another option before autoSearch kicks in.
    if ($target.attr('data-state') is 'unchecked') or not @config.get('autoSearch')
      @triggerChange()
    else
      funcky.setResetTimeout 1000, => @triggerChange()

  triggerChange: (values) =>
    unless values?
      checkedModels = @collection.filter (item) -> item.get 'checked'
      values = _.map checkedModels, (item) -> item.get('name')

    @trigger 'change',
      facetValue:
        name: @facetName
        values: values

  # ### Methods

  ###
  Called by parent (ListFacet) when user types in the search input
  ###
  filterOptions: (value) ->
    @collection.map (model) ->
      re = new RegExp value, 'i'
      model.set 'visible', re.test model.id
    # @filtered_items = @collection.models if @filtered_items.length is 0

    @collection.sort()
    @trigger 'filter:finished'

    # @render()

  setCheckboxes: (ev) ->
    visibleModels = @collection.filter (model) -> model.get 'visible'
    model.set 'checked', ev.currentTarget.checked for model in visibleModels


    if ev.currentTarget.checked
      values = _.map visibleModels, (item) -> item.get('name')
      @triggerChange values
    else
      @triggerChange()

# @triggerChange will send the new values to the server and call @rerender.

module.exports = ListFacetOptions