// a function that solve an equation using th newton method
int main() {
    int a, b, c, d, x;
    scanf("%d %d %d %d", &a, &b, &c, &d);
    x = newton(a, b, c, d);
    printf("x = %d\n", x);
    return 0;
}
int newton(int a, int b, int c, int d) {
    int x = 0;
    int epsilon = 0.00001;
    int delta = 0;
    int n = 0;
    while (delta < epsilon) {
        x = x + (d / (a * x + b));
        delta = d / (a * x + b);
        n++;
    }
    return x;
}
