// TODO manage moral
// TODO manage service
// TODO add configuration tools

var lol = window.wrappedJSObject.lol
var configuration = {}



function pageEventHandlerInit()
{
	document.addEventListener('pluginFromPageEvent', function(){
		refresh(false)
	})
	document.addEventListener('pluginFromPageEvent_force', function(){
		refresh(true)
	})
}

// remove snow effect for performance improvement
function removeSnow()
{
	if(!configuration.removeSnow)
	{
		return
	}
	var snow_items = document.getElementsByClassName("snow");
	for (var i = 0; i < snow_items.length; i++)
	{
		snow_items[i].parentNode.removeChild(snow_items[i]);
	}

}

// remove rain effect for performance improvement
function removeRain()
{
	if(!configuration.removeRain)
	{
		return
	}
	var rain_items = document.getElementsByClassName("rain");
	for (var i = 0; i < rain_items.length; i++)
	{
		rain_items[i].parentNode.removeChild(rain_items[i]);
	}

}


// add end date on service bar bar
function displayService(force)
{
	/*if(!configuration.displayService)
	{
		return
	}
	var services = document.getElementsByClassName('serv');
	for (var i = 0; i < services.length; i++)
	{
		service = services[i];
		if((!service.classList.contains('quality_text') || force) && (service.classList.contains('round') || service.classList.contains('roundTop')))
		{
			if (service.classList.contains('quality_text'))
			{
				var old_child = document.getElementById(service.dataset.pluginId)
				old_child.parentNode.removeChild(old_child)
			}
			var container = document.createElement('div')
			var value = service.title
			var text = document.createTextNode(value);
			container.appendChild(text);
			container.style.textAlign = 'center';
			container.style.width = '100%';
			container.style.opacity = "0.6";
			container.id = Math.random()
			service.dataset.pluginId = container.id
			service.appendChild(container);
			service.classList.add('quality_text');

		}
	}*/
}

// add % on quality bar bar
function displayQuality(force)
{
	if(!configuration.displayQuality)
	{
		return
	}
	var qualities = document.getElementsByClassName('qual');
	for (var i = 0; i < qualities.length; i++)
	{
		quality = qualities[i];
		if(!quality.classList.contains('service_text') || force)
		{
			if (quality.classList.contains('service_text'))
			{
				var old_child = document.getElementById(quality.dataset.pluginId)
				old_child.parentNode.removeChild(old_child)
			}
			var container = document.createElement('div')
			var value = quality.firstChild.style.width;
			value = parseInt(value.substring(0, value.length - 1), 10);
			value = 100 - value;
			value = '' + value + '%';
			var text = document.createTextNode(value);
			container.appendChild(text);
			container.style.textAlign = 'center';
			container.style.width = '100%';
			container.style.opacity = "0.6";
			container.id = Math.random()
			quality.dataset.pluginId = container.id
			quality.appendChild(container);
			quality.classList.add('service_text');

		}
	}
}

// add % on life bar
function displayLife(force)
{
	if(!configuration.displayLife)
	{
		return
	}
	var states = document.getElementsByClassName('state');
	for (var i = 0; i < states.length; i++)
	{
		state = states[i];
		if(state.classList.contains('life_text') && !force)
		{
			continue;
		}
		else if (!(state.tagName === 'DIV'))
		{
			continue;
		}
		if(state.classList.contains('life_text'))
		{
			var element = document.getElementById(state.dataset.pluginId)
			element.parentNode.removeChild(element);
			state.classList.remove('life_text')
		}
		var container = document.createElement('div')
		var value = state.firstChild.style.width;
		value = parseInt(value.substring(0, value.length - 1), 10);
		value = Math.round(value) + '%';
		var text = document.createTextNode(value);
		container.appendChild(text);
		state.dataset.pluginId = Math.random()
		// building life
		if (state.classList.contains('roundBottom'))
		{
			container.style.textAlign = 'center';
			container.style.width = '162px';
			container.style.backgroundColor = 'initial';
			container.style.position = 'relative';
			container.style.height = '17px';
			container.style.bottom = "17px";
			state.appendChild(container);
		}
		// unit details
		else if (state.classList.contains('roundTop'))
		{
			container.style.textAlign = 'center';
			container.style.width = '162px';
			container.style.backgroundColor = 'initial';
			container.style.position = 'relative';
			container.style.height = '20px';
			container.style.bottom = "20px";
			state.appendChild(container);
		}
		//unit in building
		else if(!state.classList.contains('round'))
		{
			container.style.textAlign = 'center';
			container.style.width = '60px';
			container.style.right = '20px';
			container.style.position = 'absolute';
			container.style.backgroundColor = '#eee';
			state.parentNode.appendChild(container);
		}
		// units list
		else if (state.parentNode.classList.contains('state'))
		{
			container.style.textAlign = 'center';
			container.style.width = '38px';
			container.style.backgroundColor = 'initial';
			container.style.position = 'relative';
			container.style.height = '20px';
			container.style.bottom = "20px";
			state.appendChild(container);
		}
		state.classList.add('life_text');
	}
}

function startRes()
{
	if(!configuration.displayQuality)
	{
		return
	}
	var slider = document.getElementById('ordQualSlider')
	if(slider)
	{
		slider.onmouseup = function(event){
			displayQuality(true);
		}
	}
}

function refresh(force)
{
	removeSnow(force);
	removeRain(force);
	displayQuality(force);
	displayLife(force);
	displayService(force);
}

function start()
{
	getConfiguration(function(config)
	{
		configuration = config
		pageEventHandlerInit()
		startMgmt(lol)
		startArea(lol)
		startRes()
		refresh()
	})
	
}

start()