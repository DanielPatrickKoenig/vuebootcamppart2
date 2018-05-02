def index():
    return dict()


def get_data():
    import pandas as pd
    import os
    import ujson
    df = pd.read_csv(os.path.join(request.folder, 'private', 'data/dataset_1/Video_Games_Sales_as_at_22_Dec_2016.csv'))
    #print df
    #genres = df.transpose().groupby('Global_Sales')[['Action','Adventure','Fighting','Misc','Platform','Puzzle','Racing','Role-Playing','Shooter','Simulation','Sports','Strategy']].sum()
    regions = df.groupby('Genre')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum()
    systems = df.groupby('Platform')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum()
    publishers = df.groupby('Publisher')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum()
    years = df.groupby('Year_of_Release')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales','Global_Sales']].sum()
    names = df.groupby('Name')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales','Global_Sales']].sum()
    #print years  

    output = {}
    output['regions'] = regions.to_dict()
    output['genres'] = regions.transpose().to_dict()
    output['systems'] = systems.transpose().to_dict()
    output['publishers'] = publishers.transpose().to_dict()
    #output['genres'] = genres.to_dict()
    output['years'] = years.to_dict()
    output['names'] = names.to_dict()
    nameKeys = output['names']['Global_Sales'].keys()
    #output['namesearchlist'] = [n + ' | ' + ','.join(df[df['Name'].isin([n])].dropna()['Platform'].unique()) + ' | ' + ','.join(df[df['Name'].isin([n])].dropna()['Publisher'].unique()) + ' | ' + ','.join(df[df['Name'].isin([n])].dropna()['Genre'].unique()) for n in nameKeys]
    output['namelist'] = nameKeys
    output['genrelist'] = output['genres'].keys()
    output['publisherlist'] = output['publishers'].keys()
    output['systemlist'] = output['systems'].keys()
    
    #ourput['name_list'] = output['names']['Global_Sales'].keys()


    return ujson.dumps(output)

def update_data():
    import pandas as pd
    import os
    import ujson

    df = pd.read_csv(os.path.join(request.folder, 'private', 'data/dataset_1/Video_Games_Sales_as_at_22_Dec_2016.csv'))

    genre = existsOrElse(request.vars['genre[]'],[])
    system = existsOrElse(request.vars['system[]'],[])
    publisher = existsOrElse(request.vars['publisher[]'],[])
    game = existsOrElse(request.vars['game[]'],[])

    udf = df

    tag_total = len(genre) + len(system) + len(publisher) + len(game)

    if tag_total > 0:
        udf = df[df['Genre'].isin(genre) | df['Platform'].isin(system) | df['Publisher'].isin(publisher) | df['Name'].isin(game)]
    
    sdf = udf.fillna(0)
    sales = {n : sdf[sdf['Genre'].isin([n])][['Global_Sales']].sum() for n in [g for g in sdf['Genre'].unique() if str(g) != '0']}
    

    #sales = udf[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()

    years = udf.groupby('Year_of_Release')[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum()

    output = {}
    output['subset'] = {}
    output['ratings'] = {}

    if tag_total > 0:
        for g in genre:
            output['subset'][g] = udf[udf['Genre'].isin([g])][['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()
            output['ratings'][g] = udf[udf['Genre'].isin([g])][['Critic_Score','User_Score']].mean().dropna().to_dict()
        
        for g in system:
            output['subset'][g] = udf[udf['Platform'].isin([g])][['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()
            output['ratings'][g] = udf[udf['Platform'].isin([g])][['Critic_Score','User_Score']].mean().dropna().to_dict()

        for g in publisher:
            output['subset'][g] = udf[udf['Publisher'].isin([g])][['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()
            output['ratings'][g] = udf[udf['Publisher'].isin([g])][['Critic_Score','User_Score']].mean().dropna().to_dict()

        for g in game:
            output['subset'][g] = udf[udf['Name'].isin([g])][['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()
            output['ratings'][g] = udf[udf['Name'].isin([g])][['Critic_Score','User_Score']].mean().dropna().to_dict()
    else:
        output['subset']['Total'] = udf[['NA_Sales','EU_Sales','JP_Sales','Other_Sales']].sum().to_dict()

    output['sales'] = sales

    output['years'] = years.to_dict()

    #print udf[['Critic_Score']].dropna().sum()

    #print output
    
    return ujson.dumps(output)

def existsOrElse(v,d):
    output = v
    if output is None:
        output = d
    elif isinstance(output, str):
        output = [v]
    return output

def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


