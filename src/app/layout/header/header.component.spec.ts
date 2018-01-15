import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<HeaderComponent>;
let comp: HeaderComponent;

describe(`HeaderComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should call toggleMenu on button click', () => {
    let button = fixture.debugElement.query(By.css('button'));
    let openMenu = chai.spy.on(button, 'toggleMenu');

    button.triggerEventHandler('click', {});

    expect(openMenu).to.have.been.called;
  })

  it('toggleMenu should show a hidden menu', () => {
    let menu = fixture.debugElement.query(By.css('#menu'));
    var showing;
    let button = fixture.debugElement.query(By.css('button'));

    if(!comp.showingMenu){
      showing = false;
      expect(menu).to.be.null;
    }
    else {
      showing = true;
      expect(menu).to.exist;
    }

    function toggleMenu(){
      button.triggerEventHandler('click', {});
      showing = !showing;
      fixture.detectChanges();
      menu = fixture.debugElement.query(By.css('#menu'));
      if(!showing){
        expect(menu).to.be.null;
      }
      else {
        expect(menu).to.exist;
      }
    }

    toggleMenu();
    toggleMenu();
  })

  /* snip */
});
