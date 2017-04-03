const DEFAULT_CONFIGURATION = {
		removeRain: true,
		removeSnow: true,
		displayQuality: true,
		displayLife: true,
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