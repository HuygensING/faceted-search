define (require) ->

	Views = 
		Base: require 'views/base'

	Templates =
		Facet: require 'text!html/facet.html'

	class Facet extends Views.Base

		# initialize: ->
		# 	super

		render: ->
			rtpl = _.template Templates.Facet
			@$el.html rtpl

			@

		# Override in child
		update: (newOptions) -> console.log newOptions