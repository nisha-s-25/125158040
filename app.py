from flask import Flask,request,jsonify
import requests
app=Flask(__name__)
WINDOW_SIZE=10
NUMBER_TYPES={'p':'prime','f':'fibonacci','e':'even','r':'random'}
numbers_storage={'p':[],'f':'fibonacci','e':'even','r':'random'}
def fetch_numbers(numberid):
    response=requests.get(f"http://20.244.56.144/test/numbers/{NUMBER_TYPES[numberid]}")
    return response.json() if response.status_code==200 else []
@app.route('/numbers/<numberid>',methods=['GET'])
def get_numbers(numberid):
    if numberid not in NUMBER_TYPES:
        return jsonify({'error':'Invalid number ID'}),400
    new_numbers=fetch_numbers(numberid)
    if not new_numbers:
        return jsonify({'error':'Failed to fetch new numbers'}),500
    current_numbers=numbers_Storage[numberid]
    for num in new_numbers:
        if num not in current_numbers:
            current_numbers.append(num)
    if len(current_numbers)>WINDOW_SIZE:
        current_numbers=current_numbers[-WINDOW_SIZE:]
    numbers_storage[numberid]=current_numbers
    average=sum(current_numbers)/len(current_numbers) if current_numbers else 0
    response={
        'numbers':new_numbers,
        'windowPrevState':[],
        'WindowCurrState':current_numbers,
        'avg':round(average,2)
        }
    return jsonify(response)
if __name__=='__main__':
    app.run(debug=True)
