const DEFAULT_CONFIGURATION = {
		removeRain: true,
		removeSnow: true,
		displayQuality: true,
		displayLife: true,
		searchAction: true,
		searcActionHistory: true,
		displayLifeHeavyUpdate: true,
		textSelect: true
}

function start()
{
	getConfiguration(function(config)
	{
		for(key in config)
		{
			hydrateInput(key, config[key])
		}
	})
}

function hydrateInput(key, value)
{
	var element = document.getElementById(key)
	element.checked = value
	element.onchange = function(event)
	{
		setConfiguration(key, element.checked)
	}
}

/**
 *
 * call callback with the configuration value as argument.
 * If the configuration value is not defined it uses the default value instead
 *
 */
function getConfiguration(callback, errback)
{
	var item = browser.storage.local.get(DEFAULT_CONFIGURATION)
	item.then(
		function(value)
		{
			callback(value)
		},
		function(error)
		{
			errback ? errback(error): logError(error)
		})
}

function setConfiguration(key, value)
{
	var obj = {}
	obj[key] = value
	var result = browser.storage.local.set(obj)
	result.then(null, logError)

}

function logError(error)
{
	console.error(error)
}
document.addEventListener("DOMContentLoaded", start)
