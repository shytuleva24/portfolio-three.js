import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ScrollAnimationService} from "../../services/scroll-animation.service";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    aboutMe: string = "Hello, my name is Olga Shutyleva. I am a frontend developer. Last year I studied at the Hashtag Academy school as a front-end developer. I am looking for an entry level position in a company to be hardworking, learn, grow and develop in the long term. Please see my CV, see my skills and some of my work.";
    educationRailway: string = "- Ukrainian state university of railway transport, educational program: \"Network technologies and computer equipment\"";
    educationKarazin: string = "- V. N. Karazin Kharkiv National University, educational program: \"Management of Financial and Economic Security\"";
    educationHashtag: string = "- \"Hashtag academy\", educational program: \"Front-end developer\"";
    educationUdemy: string = "- \"Udemy\", educational program: \"Angular 9\"";
}
