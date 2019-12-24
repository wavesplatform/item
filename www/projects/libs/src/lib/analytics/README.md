# Аналитика

Аналитику можно тригернуть 2 способами

1. Через inject service'а

```typescript
class SomeComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onSomeEvent(): void {
    this.analyticsService.event('Profile link pressed', {
      event_category: 'Profile',
      event_label: 'Menu',
    });
  }
}
```

2. В шаблоне. Подключаем модуль.

```typescript
@Module({
  imports: [
    // ...
    AnalyticsModule,
  ],
})
export class SomeModule {}
```

После этого будет доступна директива. По умолчанию отправка события срабатывает на клик в ноду

```angular2html
  <div [libAnalytics]="{
    event: 'Profile link pressed',
    event_category: 'Profile',
    event_label: 'Menu'
  }"></div>
```

Можно переопределить на любое другое dom-событие (@Output события не поддерживаются)

```angular2html
  <div [libAnalitics]="{}" analyticsEvent="hover"></div>
```

Второй вариант предпочтительнее, где его возможно применить, дает чуть меньшую связность компонента (декларативно изменяется поведение)
