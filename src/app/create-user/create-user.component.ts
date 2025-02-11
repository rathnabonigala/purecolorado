import { Component } from '@angular/core';
import {User} from '../user';
import {UserService} from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-user',
  imports: [],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  User: User = new User();
  constructor(private UserService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  saveUser(){
    this.userService.createUser(this.user).subscribe( data =>{
      console.log(data);
      this.goToUserList();
    },
    error => console.log(error));
  }
  goToUserList(){
    this.router.navigate(['/users']);
  }
  
  onSubmit(){
    console.log(this.user);
    this.saveUser();
  }

  }


}
