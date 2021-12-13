from flask import Flask
from keras.models import load_model
import re
from nltk.stem import SnowballStemmer as sno
from keras.preprocessing import sequence
from flask_cors import cross_origin
from flask import request
import requests

app = Flask(__name__)

import pickle
import pandas as pd

model3 = load_model(r'C:\Users\harit\reviews\model2.h5')
data = pd.read_pickle(r'C:\Users\harit\Downloads\AmazonFoodReviews\datafile.pkl')
sorted_list = pd.read_pickle(r'C:\Users\harit\Downloads\AmazonFoodReviews\sortedlist.pkl')

max_review_length=600

# data = pd.read_pickle('C:\Users\harit\Downloads\datafile.pkl')

def cleanhtml(sentance): #substitute expression contained in <> with ' '
    cleaned= re.sub(re.compile('<.*?>'),' ',sentance)
    return cleaned
#function for removing punctuations chars
def cleanpunc(sentance):
    cleaned= re.sub(r'[?|!|\'|"|#]',r'',sentance)
    cleaned= re.sub(r'[.|,|)|(|\|/]',r'',sentance)
    return cleaned
snowstem= sno('english')

def predict_this(sentance):
    i=0
    str1=' '
    final_string=[]
    all_positive_words=[] # store words from +ve reviews here
    all_negative_words=[] # store words from -ve reviews here.
    sent= sentance
    filtered_sentence=[]
    #print(sent);
    sent=cleanhtml(sent) # remove HTMl tags
    for w in sent.split():
        # we have used cleanpunc(w).split(), one more split function here 
        # because consider w="abc.def", cleanpunc(w) will return "abc def"
        # if we dont use .split() function then we will be considring "abc def" 
        # as a single word, but if you use .split() function we will get "abc", "def"
        for cleaned_words in cleanpunc(w).split():
            if((cleaned_words.isalpha()) & (len(cleaned_words)>2)):    
                s=(snowstem.stem(cleaned_words.lower())).encode('utf8')
                filtered_sentence.append(s)
                if(data['Score'].values)[i] =='Positive':
                    all_positive_words.append(s)
                if(data['Score'].values)[i] =='Negative':
                    all_negative_words.append(s)
            else:
                continue
    str1 = b" ".join(filtered_sentence) #final string of cleaned words
    final_string.append(str1)

    final_string
    for i in final_string:
        final_string=i.decode("utf-8")

    lis=[]
    for word in final_string.split():
        if word in sorted_list:
            lis.append(sorted_list.index(word)+1)

    final_string= lis
    final_string = sequence.pad_sequences([final_string], maxlen=max_review_length)
    what= ''
    if (round(float(model3.predict(final_string)))==1):
        what= 'Positive'
        acc= round(float(model3.predict(final_string))*100,2)
    else:
        what='Negative'
        acc= 100- round(float(model3.predict(final_string))*100,2)
    return what,'review with',acc,'% Accuracy'

@app.route('/')
def index():
    return '<h1>Hello World'

@app.route('/getreviewtype',methods=['GET'])
@cross_origin()
def getreview():
    print(request.args.get('name'))
    review = request.args.get('name')
    output = predict_this(review)
    print(output)
    return f'{output}'


if __name__ == "__main__":
    app.run(debug=True)

