/*
	redefine some functions for the game and inject it 
*/
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
	if(!configuration.displayQuality || !configuration.displayLife)
	{
		return
	}
	if(lol.Area)
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
	}
}