import { Injectable } from '@angular/core';
import { environment } from '../environment';
import axios from "axios";
import { ContactInfoService } from './contact-info.service';

@Injectable()
export class ApiService {
    baseUrl = environment.baseUrl;

    constructor(private contactInfoService: ContactInfoService) {}

    login(email: string, password: string) {
        return axios.post(`${this.baseUrl}/Login/login`, {
            email: email,
            password: password
        })
        .then((response) => {
            localStorage.setItem('token', response.data[0].token);
            this.contactInfoService
                .setContactInfo(response.data[0].personalDetails.name, 
                                response.data[0].personalDetails.team,
                                response.data[0].personalDetails.joinedAt,
                                response.data[0].personalDetails.avatar);
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    }

    getProjects(config: {
        headers: any
    })
    {
        return axios.get(`${this.baseUrl}/Projects/projects`, config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    }

}