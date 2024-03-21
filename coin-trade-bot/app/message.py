import telegram
from telegram.ext import Updater, MessageHandler, Filters, CommandHandler


class Telegram:
    def __init__(self, botToken, chatId):
        self.botToken = botToken
        self.chatId = chatId
        self.bot = telegram.Bot(token=self.botToken)
        self.activate = 1
        self.web = 0
        self.updater = Updater(token=botToken, use_context=True)
        self.dispatcher = self.updater.dispatcher
        self.dispatcher.add_handler(CommandHandler('start', self.on_switch))
        self.dispatcher.add_handler(
            CommandHandler('webmsg', self.webmsg_switch))
        # self.dispatcher.add_handler(
        #     CommandHandler('bring', self.account.print_balance))
        self.dispatcher.add_handler(CommandHandler('end', self.off_switch))
        self.dispatcher.add_handler(CommandHandler(
            'self', self.manual_trans, pass_args=True))
        print(botToken, chatId)
        self.updater.start_polling()

    def start(self):
        custom_keyboard = [['/bring', '/end'],  ['/start', '/webmsg']]
        reply_markup = telegram.ReplyKeyboardMarkup(custom_keyboard)
        self.bot.send_message(chat_id=self.chatId,
                              text="매크로가 시작되었습니다.",  reply_markup=reply_markup)

    def print(self, msg):
        self.bot.send_message(chat_id=self.chatId, text=msg)

    def on_switch(self, update, context):
        self.activate = 1

    def off_switch(self, update, context):
        self.activate = 0

    def webmsg_switch(self, update, context):
        if self.web == 0:
            self.web = 1
        else:
            self.web = 0

    def manual_trans(self, update, context):
        for arg in context.args:
            try:
                ticker = arg + 'USDT'
                self.list[ticker][0].manual = True
                print('수동조정 성공', arg)
            except:
                self.bot_print('수동조정 실패: '+arg)
