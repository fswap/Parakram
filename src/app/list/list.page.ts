import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import * as Observable from 'zen-observable';
import * as mutations from '../../graphql/mutations';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
 // console.log(allTodos);
  public items: Array<{ title: string; note: string; icon: string; time: any }> = [];
  constructor() {
    this.getData();
  }
  async getData() {
    const allTodos = await (API.graphql(graphqlOperation(queries.getTest, { id: 'Cricket' })) as Promise<any>).then(ss => {
      console.log(JSON.stringify(ss.data.getTest.Fixtures));
      this.pushItem(JSON.stringify(ss.data.getTest.Fixtures));
    });
  //   .subscribe({
  //     next: async (todoData) => {console.log(todoData);
  //     console.log("ggggggggggggggg");
  //     // this.items.push({
  //     //   title: 'Item ' ,
  //     //   note: 'This is item #',
  //     //   time: JSON.parse(JSON.stringify(todoData)).data.getTest.Fixtures[0].Time.toString(),
  //     //   icon: this.icons[Math.floor(Math.random() * this.icons.length)]
  //     // });
  //   },
  //   error: (error: any) => {
  //     console.log(JSON.stringify(error));
  //   }
  // })
      
  

    
    const todoDetails = {
      id: 'Todo 1',
      Fixtures: '[{"Venue":"SAC","Team":"Topaz","Time":"adasd","Team1":"Emarald","Date":"sdfg","Result":"null"}]'
  };
    //console.log(JSON.stringify(allTodos));
    const observable: Observable<object> = API.graphql(graphqlOperation(subscriptions.onUpdateTest)) as Observable<object>;
    observable.subscribe({
      next: async (todoData) => {console.log(todoData);
      console.log('ggggggggggggggg');
    },
    error: (error: any) => {
      console.log(JSON.stringify(error));
    }
  });

const newTodo = await API.graphql(graphqlOperation(mutations.updateTest, {input: todoDetails}));
console.log(newTodo);
API.graphql(graphqlOperation(subscriptions.onUpdateTest,));
  }

  pushItem( ss ) {
    const sss = JSON.parse(JSON.parse(ss));
    console.log(sss);
    sss.forEach(fixture => {
      this.items.push({
        title: 'Item ' ,
        note: 'This is item #',
        time: 'ss' + JSON.stringify(fixture.Time),
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
