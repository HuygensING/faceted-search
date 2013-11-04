define (require) ->
	pubsub = require 'hilib/mixins/pubsub'
	ServerResponse = require 'models/serverresponse'

	class ServerResponses extends Backbone.Collection

		model: ServerResponse

		initialize: ->
			_.extend @, pubsub

			@currentQueryOptions = null
			@cachedModels = {}

			@on 'add', @setCurrent, @

		setCurrent: (model) ->
			@current = model
			@publish 'change:results', model, @currentQueryOptions

		runQuery: (@currentQueryOptions) ->
			if @currentQueryOptions.hasOwnProperty 'resultRows'
				resultRows = @currentQueryOptions.resultRows
				delete @currentQueryOptions.resultRows

			data = JSON.stringify @currentQueryOptions

			if @cachedModels.hasOwnProperty data
				@setCurrent @cachedModels[data]
			else
				serverResponse = new ServerResponse()
				serverResponse.resultRows = resultRows if resultRows?
				serverResponse.fetch
					data: data
					success: (model, response, options) => 
						@cachedModels[data] = model
						@add model

		moveCursor: (direction) ->
			if url = @current.get direction
				if @cachedModels.hasOwnProperty url
					@setCurrent @cachedModels[url]
				else
					serverResponse = new ServerResponse()
					serverResponse.fetch
						url: url
						success: (model, response, options) => 
							@cachedModels[url] = model
							@add model