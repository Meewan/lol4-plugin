lol.Plugin = {}

lol.Plugin.fuse = true

lol.Plugin.start = function()
{
	// protection to not apply modifications multiple time
	if(!lol.Plugin.fuse)
	{
		return
	}
	if(lol.Mgmt)
	{
		lol.Plugin.startMgmt()
	}
	if(lol.Area)
	{
		lol.Plugin.startArea()
	}
}

lol.Plugin.startMgmt = function()
{
	if(! lol.Plugin.config.displayQuality || ! lol.Plugin.config.displayLife)
	{
		return
	}
	var gameFunction = lol.Mgmt.updateWithData
	lol.Mgmt.updateWithData = function(data, setup){
		var result = gameFunction(data, setup)
		var event = new Event('pluginFromPageEvent')
		document.dispatchEvent(event)
		return result
	}
}

lol.Plugin.startArea = function()
{
	if( lol.Plugin.config.displayQuality ||  lol.Plugin.config.displayLife)
	{
		//manage refresh for end of action
		var gameFunction = lol.Area.refresh
		lol.Area.refresh = function(event){
			var result = gameFunction(event)
			var evt = new Event('pluginFromPageEvent_force')
			// dirty hack to not rewrite the lol.Area.refresh function
			setTimeout(function(){document.dispatchEvent(evt)}, 100)
			return result
		}

		//manage unit details
		var holdClickOld = lol.Area.holdClick
		lol.Area.holdClick = function(event){
			var result = holdClickOld(event)
			var evt = new Event('pluginFromPageEvent')
			// dirty hack to not rewrite the lol.Area.refresh function
			setTimeout(function(){document.dispatchEvent(evt)}, 260)
			return result
		}

		if( lol.Plugin.config.displayLife)
		{
			var oldUpdate = lol.Area.log.update
			lol.Area.log.update = function()
			{
				oldUpdate()
				var evt1 = new Event('pluginFromPageEvent_force')
				// dirty hack to not rewrite the lol.Area.refresh function
				setTimeout(function(){document.dispatchEvent(evt1)}, 100)
				if(lol.Plugin.config.displayLifeHeavyUpdate)
				{
					var evt2 = new Event('pluginFromPageEvent_force')
					var evt3 = new Event('pluginFromPageEvent_force')
					setTimeout(function(){document.dispatchEvent(evt2)}, 300)
					setTimeout(function(){document.dispatchEvent(evt3)}, 500)
				}
			}
		}
	}
	if( lol.Plugin.config.searchAction)
	{
		var updateWithNewActionDataOld = lol.Area.updateWithNewActionData
		lol.Area.updateWithNewActionData = function(data)
		{
			var result = updateWithNewActionDataOld(data)
			var event = new Event('pluginFromPageEvent')
			document.dispatchEvent(event)
			return result
		}
	}
}