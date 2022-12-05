import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/model/client';
import { ClientService } from 'src/app/core/service/client/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  dataSource!: Array<Client>;
  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'phone', 'city','country'];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.dataSource = this.clientService.getAll()
  }

}
