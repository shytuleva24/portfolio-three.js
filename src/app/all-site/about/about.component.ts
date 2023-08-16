import {Component} from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    aboutMe: string = "I am a highly motivated front-end developer specializing in Angular. My portfolio showcases over 30 projects, including educational, corporate, and elegant custom websites. Successful project management from inception to completion is a result of my ability to communicate with clients at an international level on the Upwork platform. Additionally, I have experience teaching an advanced HTML+CSS course, helping students develop their web development skills.";
    aboutMeTwo: string = "With over 7 years of prior work experience before entering the IT field, I demonstrated responsibility, swift problem-solving, and the capacity to create a positive team atmosphere. My skills also encompass the rapid assimilation of new material and an enduring passion for education. A team player, I am prepared to take on diverse tasks and see them through to completion within discussed timelines.";
    educationRailway: string = "- Ukrainian state university of railway transport, educational program: \"Network technologies and computer equipment\"";
    educationKarazin: string = "- V. N. Karazin Kharkiv National University, educational program: \"Management of Financial and Economic Security\"";
    educationHashtag: string = "- \"Hashtag academy\", educational program: \"Front-end developer\"";
    educationUdemy: string = "- \"Udemy\", educational program: \"Angular 9\"";
}
