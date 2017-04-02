function start()
{
	document.addEventListener('configLoaded', function(){
		alert('toto')
	})
	var startEvent = new Event('loadConfig')
	document.dispatchEvent(startEvent)
}