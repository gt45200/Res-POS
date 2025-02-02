import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

// tumbnail data
export interface ThumbnailData {
  image: string;
  title: string;
  stock: number;
  price: number;
}

@Injectable({
  providedIn: "root",
})
export class SharedService {
  // API CALL SERVICE
  constructor(private http: HttpClient) {}

  // private apiUrl = "";
  // Fetch categories from the API to display on filtermenu
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  fetchCategories(tenantId: number): void {
    const url = `/api/Category/Category?tenantId=${tenantId}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.categoriesSubject.next(data); // Update the state with the fetched data
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  // Fetch products from the API according to filtermenu
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable(); // Observable for products

  fetchProducts(categoryId: number, tenantId: number): void {
    const url = `/api/Product/Product?category=${categoryId}&tenantId=${tenantId}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.productsSubject.next(data);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  // fetch category for filter menu
  getCategories() {
    return this.http.get<any[]>("/api/Category/Category?tenantId=1");
  }

  // Thumbnail Holder when i click product thumbnail
  private thumbnailHolder = new BehaviorSubject<ThumbnailData | null>(null);
  thumbnail$ = this.thumbnailHolder.asObservable();

  setThumbnail(data: ThumbnailData) {
    this.thumbnailHolder.next(data);
  }

  clearThumbnail() {
    this.thumbnailHolder.next(null);
  }

  // Method to display product detail on orderlist
  private orderListSubject = new BehaviorSubject<any[]>([]);
  orderList$ = this.orderListSubject.asObservable();

  addToOrderList(product: any) {
    const currentOrderList = this.orderListSubject.value;
    this.orderListSubject.next([...currentOrderList, product]);
  }
  updateOrderList(orderList: any[]) {
    this.orderListSubject.next(orderList);
  }
}
