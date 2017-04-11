/*
	redefine some functions for the game and inject it 
*/

function configInjector(lol, config)
{
	var actualCode = "lol.Plugin={};lol.Plugin.config=JSON.parse('" + JSON.stringify(config) + "')"

	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}


function startMgmt(lol)
{
	if(!configuration.displayQuality || !configuration.displayLife)
	{
		return
	}
	if(lol.Mgmt)
	{
		var gameFunction = lol.Mgmt.updateWithData
		var newFunction = function(data, setup){
			var result = gameFunction(data, setup)
			var event = new Event('pluginFromPageEvent')
			document.dispatchEvent(event)
			return result
		}
		exportFunction(newFunction, lol.Mgmt, {defineAs:'updateWithData'})
	}
}

function startArea(lol)
{
	if(lol.Area)
	{
		if(configuration.displayQuality || configuration.displayLife)
		{
			//manage refresh for end of action
			var gameFunction = lol.Area.refresh
			var newFunction = function(event){
				var result = gameFunction(event)
				var evt = new Event('pluginFromPageEvent_force')
				// dirty hack to not rewrite the lol.Area.refresh function
				setTimeout(function(){document.dispatchEvent(evt)}, 100)
				return result
			}
			exportFunction(newFunction, lol.Area, {defineAs:'refresh'})

			//manage unit details
			var holdClickOld = lol.Area.holdClick
			var holdClick = function(event){
				var result = holdClickOld(event)
				var evt = new Event('pluginFromPageEvent')
				// dirty hack to not rewrite the lol.Area.refresh function
				setTimeout(function(){document.dispatchEvent(evt)}, 260)
				return result
			}
			exportFunction(holdClick, lol.Area, {defineAs:'holdClick'})

			if(configuration.displayLife)
			{
				var oldUpdate = lol.Area.log.update
				//lol.Area.log.displayLifeHeavyUpdate = configuration.displayLifeHeavyUpdate
				var update = function()
				{
					oldUpdate()
					var evt1 = new Event('pluginFromPageEvent_force')
					// dirty hack to not rewrite the lol.Area.refresh function
					setTimeout(function(){document.dispatchEvent(evt1);}, 100)
					if(lol.Plugin.config.displayLifeHeavyUpdate)
					{
						var evt2 = new Event('pluginFromPageEvent_force')
						var evt3 = new Event('pluginFromPageEvent_force')
						setTimeout(function(){document.dispatchEvent(evt2);}, 300)
						setTimeout(function(){document.dispatchEvent(evt3);}, 500)
					}
				}
				exportFunction(update, lol.Area.log, {defineAs:'update'})
			}
		}
		if(configuration.searchAction)
		{
			var updateWithNewActionDataOld = lol.Area.updateWithNewActionData
			function updateWithNewActionData(data)
			{
				var result = updateWithNewActionDataOld(data)
				var event = new Event('pluginFromPageEvent')
				document.dispatchEvent(event)
				return result
			}
			exportFunction(updateWithNewActionData, lol.Area, {defineAs:'updateWithNewActionData'})
		}
	}
}