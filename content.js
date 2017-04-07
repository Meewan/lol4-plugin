// TODO manage moral
// TODO manage service
// TODO add configuration tools

var lol = window.wrappedJSObject.lol
var configuration = {}
var data = {}



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
		if(quality.className === 'qual')
		{
			continue
		}
		if(!quality.classList.contains('qual_text') || force)
		{
			if (quality.classList.contains('qual_text'))
			{
				var old_child = document.getElementById(quality.dataset.pluginId)
				old_child.parentNode.removeChild(old_child)
			}
			var container = document.createElement('div')
			var value = quality.firstChild.style.width
			value = parseInt(value.substring(0, value.length - 1), 10)
			value = 100 - value
			value = '' + value + '%'
			var text = document.createTextNode(value)
			container.appendChild(text)
			container.style.textAlign = 'center'
			container.style.width = '100%'
			container.style.opacity = "0.6"
			container.id = Math.random()
			quality.dataset.pluginId = container.id
			quality.appendChild(container)
			quality.classList.add('qual_text')

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
		slider.onmouseup = function(event)
		{
			displayQuality(true);
		}
	}
}

function updateSearch()
{
	var container = document.getElementById("anewacts")
	if(container && configuration.searchAction)
	{
		for(var elt = container.firstChild; elt != null; elt = elt.nextElementSibling)
		{
			//get fulltext actionName
			var c = elt.firstChild.firstChild
			if(c.classList.contains("shortcut"))
			{
				c = c.nextElementSibling
			}
			var text = c.firstChild.data.toLowerCase()

			if(data.search === "" || text.includes(data.search))
			{
				elt.style.display = "block"
			}
			else
			{
				elt.style.display = "none"
			}

		}
	}
}

function startSearch()
{
	var anchor = document.getElementById("atabs")

	function doStartSearch(history)
	{
		if(configuration.searcActionHistory)
		{
			data.search = history
		}
		else
		{
			data.search = ""
		}
		var container = document.createElement('div')
		var input = document.createElement('input')
		input.type = "text"
		input.id = "plugin_ActionSearch"
		input.onkeyup = function(event)
		{
			event.stopPropagation()
			data.search = event.target.value.toLowerCase()
			updateSearch()
			setToStorage('searcActionHistoryData', data.search)
		}
		input.placeholder = "search action"
		input.style.width = "94%"
		input.style.background = "#fff url(/img/icon/search.png) no-repeat 7px center"
		input.style.height = "30px"
		input.style.backgroundSize = "16px 16px"
		input.style.paddingLeft = "30px"
		input.value = data.search

		container.appendChild(input)
		anchor.parentNode.insertBefore(container, anchor)
	}

	if(anchor && configuration.searchAction)
	{
		if(configuration.searcActionHistory)
		{
			getFromStorage("searcActionHistoryData", "", doStartSearch)
		}
		else
		{
			doStartSearch("")
		}
	}
}

function refresh(force)
{
	removeSnow(force)
	removeRain(force)
	displayQuality(force)
	displayLife(force)
	displayService(force)
	updateSearch()
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
		startSearch()
		refresh()
	})
	
}

start()