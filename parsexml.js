// from http://goessner.net/download/prj/jsonxml/
// function parseXml(xml) {
//    var dom = null;
//    if (window.DOMParser) {
//       try { 
//          dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
//       } 
//       catch (e) { dom = null; }
//    }
//    else if (window.ActiveXObject) {
//       try {
//          dom = new ActiveXObject('Microsoft.XMLDOM');
//          dom.async = false;
//          if (!dom.loadXML(xml)) // parse error ..

//             window.alert(dom.parseError.reason + dom.parseError.srcText);
//       } 
//       catch (e) { dom = null; }
//    }
//    else
//       alert("cannot parse xml string!");
//    return dom;
// }

// from http://stackoverflow.com/questions/4200913/xml-to-javascript-object
function parseXml(xml, arrayTags)
{
    var dom = null;
    if (window.DOMParser)
    {
        dom = (new DOMParser()).parseFromString(xml, "text/xml");
    }
    else if (window.ActiveXObject)
    {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml))
        {
            throw dom.parseError.reason + " " + dom.parseError.srcText;
        }
    }
    else
    {
        throw "cannot parse xml string!";
    }

    function isArray(o)
    {
        return Object.prototype.toString.apply(o) === '[object Array]';
    }

    function parseNode(xmlNode, result)
    {
        if(xmlNode.nodeName == "#text" && xmlNode.nodeValue.trim() == "")
        {
            return;
        }

        var jsonNode = {};
        var existing = result[xmlNode.nodeName];
        if(existing)
        {
            if(!isArray(existing))
            {
                result[xmlNode.nodeName] = [existing, jsonNode];
            }
            else
            {
                result[xmlNode.nodeName].push(jsonNode);
            }
        }
        else
        {
            if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
            {
                result[xmlNode.nodeName] = [jsonNode];
            }
            else
            {
                result[xmlNode.nodeName] = jsonNode;
            }
        }

        if(xmlNode.attributes)
        {
            var length = xmlNode.attributes.length;
            for(var i = 0; i < length; i++)
            {
                var attribute = xmlNode.attributes[i];
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            }
        }

        var length = xmlNode.childNodes.length;
        for(var i = 0; i < length; i++)
        {
            parseNode(xmlNode.childNodes[i], jsonNode);
        }
    }

    var result = {};
    if(dom.childNodes.length)
    {
        parseNode(dom.childNodes[0], result);
    }

    return result;
}