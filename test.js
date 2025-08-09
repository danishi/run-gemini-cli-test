// テスト結果を表示する要素
const testResults = document.getElementById('test-results');

// アサーション関数
function assert(condition, message) {
    const li = document.createElement('li');
    li.className = condition ? 'pass' : 'fail';
    li.textContent = message;
    testResults.appendChild(li);
}

// テストスイート
function runTests() {
    console.log('Running tests...');

    // --- テストのセットアップ ---
    function setup() {
        // items 配列と localStorage をリセット
        items = [];
        localStorage.clear();
    }

    // --- テストケース ---

    // addItem のテスト
    function testAddItem() {
        setup();
        addItem('テストアイテム1');
        assert(items.length === 1, 'addItem: items配列にアイテムが1つ追加されること');
        assert(items[0] === 'テストアイテム1', 'addItem: 正しいアイテムが追加されること');
        
        const storedItems = JSON.parse(localStorage.getItem('items'));
        assert(storedItems.length === 1, 'addItem: localStorageにアイテムが1つ保存されること');
        assert(storedItems[0] === 'テストアイテム1', 'addItem: localStorageに正しいアイテムが保存されること');
    }

    // updateItem のテスト
    function testUpdateItem() {
        setup();
        addItem('元のアイテム');
        updateItem(0, '更新後のアイテム');
        assert(items[0] === '更新後のアイテム', 'updateItem: items配列のアイテムが更新されること');

        const storedItems = JSON.parse(localStorage.getItem('items'));
        assert(storedItems[0] === '更新後のアイテム', 'updateItem: localStorageのアイテムが更新されること');
    }

    // deleteItem のテスト
    function testDeleteItem() {
        setup();
        addItem('アイテム1');
        addItem('アイテム2');
        deleteItem(0);
        assert(items.length === 1, 'deleteItem: items配列のアイテムが1つ削除されること');
        assert(items[0] === 'アイテム2', 'deleteItem: 正しいアイテムが削除されること');

        const storedItems = JSON.parse(localStorage.getItem('items'));
        assert(storedItems.length === 1, 'deleteItem: localStorageのアイテムが1つ削除されること');
    }

    // --- テストの実行 ---
    testAddItem();
    testUpdateItem();
    testDeleteItem();

    console.log('Tests finished.');
}

// DOMが読み込まれたらテストを実行
document.addEventListener('DOMContentLoaded', runTests);
