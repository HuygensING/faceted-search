define (require) ->

	Models =
		Option: require 'models/list.option'

	Collections =
		Base: require 'collections/base'

	class ListItems extends Collections.Base

		model: Models.Option

		parse: (attrs) -> 
			# console.log 'parse', attrs
			attrs

		comparator: (model) ->
			-1 * parseInt model.get('count'), 10

		# Alias for reset, because a collection already has a reset method.
		revert: -> 
			@each (option) => option.set 'checked', false, silent: true
			@trigger 'change'

		updateOptions: (newOptions=[]) ->
			@each (option) => option.set 'count', 0, silent: true

			_.each newOptions, (newOption) =>
				# newOption.name = '<i>(empty)</i>' if newOption.name is '' # Bugprone what if somebody changes the default empty name?
				# console.log @
				# console.log newOption.name
				# console.log @get newOption.name

				opt = @get newOption.name
				opt.set 'count', newOption.count, silent: true

			@sort()
			