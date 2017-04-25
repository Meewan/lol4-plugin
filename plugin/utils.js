const DEFAULT_CONFIGURATION = {
		removeRain: true,
		removeSnow: true,
		displayQuality: true,
		displayLife: true,
		searchAction: true,
		searcActionHistory: true,
		displayLifeHeavyUpdate: true
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

function getFromStorage(key, defaultValue, callback, errback){
	var keyObj = {}
	keyObj[key] = defaultValue
	var item = browser.storage.local.get(keyObj)
	item.then(
		function(value)
		{
			callback(value[key])
		},
		function(error)
		{
			errback ? errback(error): logError(error)
		})
}

function setToStorage(key, value)
{
	var obj = {}
	obj[key] = value
	var result = browser.storage.local.set(obj)
	result.then(null, logError)

}


function injectCode(type, code)
{
	var script = document.createElement(type);
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);
}

function insertAfter(refElement, element)
{
	refElement.parentNode.insertBefore(element, refElement.nextSibling)
}

function logError(error)
{
	console.error(error)
}