import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-800 text-white pt-10 pb-6 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 class="font-bold mb-2">Get to Know Us</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">About Pure Colorado</a></li>
            <li><a href="#" class="hover:underline">Careers</a></li>
            <li><a href="#" class="hover:underline">Press Releases</a></li>
            <li><a href="#" class="hover:underline">Pure Colorado Science</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2">Connect with Us</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Facebook</a></li>
            <li><a href="#" class="hover:underline">Twitter</a></li>
            <li><a href="#" class="hover:underline">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2">Make Money with Us</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Sell on Pure Colorado</a></li>
            <li><a href="#" class="hover:underline">Affiliate Program</a></li>
            <li><a href="#" class="hover:underline">Advertise Your Products</a></li>
            <li><a href="#" class="hover:underline">Become an Associate</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2">Let Us Help You</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Your Account</a></li>
            <li><a href="#" class="hover:underline">Shipping Rates</a></li>
            <li><a href="#" class="hover:underline">Returns</a></li>
            <li><a href="#" class="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>
      <div class="text-center mt-10 text-xs text-gray-400">
        <p>&copy; {{ currentYear }} Pure Colorado. All rights reserved.</p>
      </div>
    </footer>
  `,
  
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
