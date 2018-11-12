# Supporting Rest and Web interface for Finacle Treasury

Aim of this project is to enable Rest Services and Web interface for Finacle Treasury. Current architecture of Finacle Treasury is stateful and client server architecture. We will continue to have client server architecture but it will now be [stateless](#Stateless Architecture). It will be n-tier architecture, starting from UI layer in Polymer, Web server as nodejs, and API server will current C++ server (what we call as ftserver). We will use [JSON](https://www.json.org/) to to transmit data objects between these layers. Current ftserver has been enhanced to support JSON data objects over currently used LIMO framework for communication.

## Stateless Architecture
Currently a client (smartclient/thinclient) uses dedicated connection to ftserver. State is maintained on server side, and is managed using View Handles which points to View Objects or a FBX/FBI Objects. Going ahead server will not maintain the state on server side, and requests can go to any available server, so m users can share n servers, instead of one to one client - server process mapping. More details are available [here](docs/StatelessServer.md).

## Software Required
For development you must install node, mongodb, and git as minimum. 
<br>
[Software Download Details](docs/Software.md)

## Handling Json Related Services in ftserver
ftserver has been enahanced to support Json based request response APIs.
* String to Json Parsing (IQJsonParser)
* Json to FBO (UnpackJson)
* FBO to Json (PackAsJson)
* Json Processing (IQJsonProcessor)

Details are given [here](docs/JsonServices.md) 

### Additional Notes 
See [Notes](docs/Notes.md) here

### steps
1. modify ft-app.html, add entry in app-pages (iron-pages), map component-name (form/list) to route

2. Add UIComponent in server/boot/upload-uicomponents.js 

3. Add model to server/boot/create-models.js 

4. Ensure latest vgen-fbo has been has been run on your model in FT server

5. add <your-component-form> or <your-component-list.html> in client/pages

### Server Side changes to handle Sub FBOs (Table)

1. If FBO has child FBOs we must over ride SubFieldList Method. You must append the filedId of childFBO in IQFieldId List. To know what field needs to be added you can refer FindObject method or check fieldId of Table Control in Smart Client. Example IQChargeCode adds field Id RECORD_LIST to sub field list, RECORD_LIST points to charge slab vector in FindObject.

```
void
IQChargeCode::SubFieldList(RWTValSlist<IQFieldId>& list) const
{
    IQChargeCode_g::SubFieldList(list);
    list.append(RECORD_LIST);
}
```

2. You must override GetFieldMeta to handle sub field id to return Array and type of childFBO, Example IQChargeCode::GetFieldMeta

```
IQBoolean
IQChargeCode::GetFieldMeta(const IQField& id, IQFieldMeta& meta) const
{
    IQBoolean   ret = TRUE;
    switch (id.FieldId())
    {
        case RECORD_LIST:
            meta.SetType("Array");
            meta.SetSubObjectType(FBO_CHARGE_SLAB);
            break;
        default:
            ret = IQChargeCode_g::GetFieldMeta(id, meta);
            break;
    }
    return ret;
}
```

### Guidlines 
* For string use oe-input component
* For date use oe-date component
* For Number use oe-decimal component
* For Number as Intergers use precison=0 
* For meta data driven forms, Do not use required attribute in html file, let it get set based on field-id


## Standing Data View
* In general we should not use view classes
* Forming filters, we can support filters
*   Pending Sign off, Node JS or client side
* Whichever is possible in client side should not be done in nodejs and c++
* There can be some exceptions, 
* 

# Session & multi entity
We are going to change current user, permissioned entity with every request
JSON processor will just switch the pointer but need not refetch from DB
Node JS itself can 
FT process will always load data for all entities.
Entity handling can be in node js or json processor or case.
Not from borwser.
JSON processor 
Node JS can modify the filter for multi entity (may be some exception)

# EOD Authorization View

# EOD Details
NEXT_TRADING_DATE, EOD_NEXT_SYSTEM_DATE, EOD_GL_DATE etc. in eod details
It is updating NEXT_TRADING_DATE in entity.
AUTHORISED is in FBO_ENTITY_GROUP_DATA
IN_PROGRESS
IQEntityGroupData*      _entityGroup;
IQFieldBasedSrtVec      _detailsData;



## App layout

force-narrow

### TODO
* One sample for view class, Holiday
* Red field for combo (charge? multi)


Filter needs to support subquery

filter
has sub objects like 
where, limit,

filter should support filter.ft
filter.ft should be handled by jsonProcessor
filter.ft.

filter.where is there
filter.ft.myentities = true 

After save URL or screen should show FB Number, Audit Fields
List : New Button
Shall we avoid fetch of data from list
Shall we merge list and form 
After save shall we show list Or some other block




oe-input readonly value=cpty_roles

counterparty.cpty_roles = [{"name":"AGENT"}, {"name":"BROKER"}]
on model fetch
cpty_roles = AGENT, BROKER

on dialoge open

iterate roleslist  set checked true/false
if present in counterparty.cpty_roles

on dialoge accept
take temp array 
iterate roleslist  checked where true
    push temp

counterparty.cpty_roles  = temp used for       save
cpty_role                       used for display




/counterparty           Search Box 
                        No list by default
                        On search Fetch Of counterparty

/counterparty/1234      
                        1234
                        No search box
                        Inquiry (phase2)

/counterparty/1234/ssi  
                        counterparty search box = 1234
                        for all currencies?
                        currency filter optional

    Dom repeat
    Paper Collapse
    Edit


in smart client for a combo field, we give two field ids

fieldid1, fieldid2

fieldid1 is the field id of the data object
fieldid2 is the combo field id of view class

view class may map the combo field id to listserver field id Or may write its own logic as some function

 IQ_LSRV_COMBO   ( fieldid2,fieldid3)

if it is simple listseever mapping

/api/combovalues/fieldid3




ft-currency
ft-calendar   multi



## Patterns
1. Simple and Small Static Data Example Department
        Single Component List and Form 
        Merge into single component
        Edit half page
        Inquiry and edit can share space
2. Simple and Large Static Data
        Single component
        For Edit full page
3. Counterparty and sec defn kind 
        Follow tabs
4. Dashboards
    For now not to be done
5. 

### Review & TODO
1. Limo client error handling
2. Session
3. Button in dialogues do not style yourself
4. Size and positioning of dialogues
5. Two column for dialogue or small forms
6. Non persistent fields and FBNum, use string, may be we need to pack and unpack smart pointers
7. URL not getting changed on search result fetch
8. Address in text area
9. ft-combo multi select object to work properly
10. app drawer home icon and close icon instead of current
11. search in app drawer
12. ft-trading-book, launch button to be part of this component



OLD GL BAL

ACCNUM 				   NOT NULL VARCHAR2(15 CHAR)
 BRANCHID				   NOT NULL VARCHAR2(15 CHAR)
 CCYCDE 				   NOT NULL VARCHAR2(3 CHAR)
 CPTYSTATDATE					    DATE
 CPTYSTMTBAL				   NOT NULL NUMBER
 CURBAL 				   NOT NULL NUMBER
 DEPARTMENTID				   NOT NULL VARCHAR2(15 CHAR)
 END_OF_YEAR				   NOT NULL DATE
 LASTEOD					    NUMBER
 LBS_AMOUNT					    NUMBER
 LEDGER 				   NOT NULL VARCHAR2(15 CHAR)
 OPENDATE				   NOT NULL DATE
 PD00					   NOT NULL NUMBER
 PD01					   NOT NULL NUMBER
 PD02					   NOT NULL NUMBER
 PD03					   NOT NULL NUMBER
 PD04					   NOT NULL NUMBER
 PD05					   NOT NULL NUMBER
 PD06					   NOT NULL NUMBER
 PD07					   NOT NULL NUMBER
 PD08					   NOT NULL NUMBER
 PD09					   NOT NULL NUMBER
 PD10					   NOT NULL NUMBER
 PD11					   NOT NULL NUMBER
 PD12					   NOT NULL NUMBER
 PD13					   NOT NULL NUMBER
 PRIOREOD				   NOT NULL NUMBER
 START_OF_YEAR				   NOT NULL DATE
 TRANTIME				   NOT NULL DATE
 USERID 				   NOT NULL VARCHAR2(30 CHAR)

 



