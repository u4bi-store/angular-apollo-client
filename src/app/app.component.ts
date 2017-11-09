import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const boardsQuery = gql`
    {
        boards{
            id,
            writer,		
            title,
            content
        }
    }
`;

const boardQuery = gql`
    {
        board(id : "HyA_VQBub"){
            id,
            writer,		
            title,
            content
        }
    }
`;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public boards : any[];
    public board : any;

    constructor(private apollo: Apollo){}

    graphqlQuery = (query : any) => this.apollo.watchQuery<any>( { query : query } ).valueChanges;
    graphqlMutation = (query : any) => this.apollo.mutate( { mutation : query } );
    
    ngOnInit() {
        
        /* https://www.apollographql.com/docs/angular/basics/queries.html */
        this.graphqlQuery(boardsQuery).subscribe(({data}) => {
            this.boards = data.boards;
        });

        this.graphqlQuery(boardQuery).subscribe(({data}) => {
            this.board = data.board;
        });
    }

    mutation(){
        
        /* https://www.apollographql.com/docs/angular/basics/mutations.html */
        let mutationQuery = gql`
            mutation{
                editBoard(id:"HyA_VQBub", title : "${ Math.random() }"){
                    id,
                    writer,
                    title,
                    content
                }
            }
        `;

        this.graphqlMutation(mutationQuery).subscribe(({data}) => {
            console.log(data.editBoard);
        });

    }
}
