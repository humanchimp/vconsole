import { expect } from "chai";
import { spy as createSpy, SinonSpy } from "sinon";
import {
  wrapConsole,
  virtualMethods,
  Vconsole,
} from "../src/Vconsole";

describe("wrapConsole", () => {
  let subject: Vconsole;
  let spy: SinonSpy;

  beforeEach(() => {
    spy = createSpy();
    subject = wrapConsole(console, spy);
  });

  it("should produce a vconsole instance", () => {
    subject.log("hi");

    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args).to.eql(["log", ["hi"]]);
  });
});

describe("new Vconsole()", () => {
  const memory = {},
    Console = {};
  let subject;

  beforeEach(() => {
    subject = new Vconsole({
      memory,
      Console,
    } as any);
  });

  describe(".memory", () => {
    it("should be passed through from the backing console", () => {
      expect(subject.memory).to.equal(memory);
    });
  });

  describe(".Console", () => {
    it("should be passed through from the backing console", () => {
      expect(subject.Console).to.equal(Console);
    });
  });

  describeEach("virtual method", virtualMethods, method => {
    it("should delegate to the method method", () => {
      const methodSpy = createSpy(subject, "method");

      subject[method]("oats", "hay");

      expect(methodSpy.calledOnce).to.be.true;
      expect(methodSpy.getCall(0).args).to.eql([method, ["oats", "hay"]]);
    });
  });

  describe(".addListener(event, listener)", () => {
    describe("for message events", () => {
      let listenerSpy: SinonSpy;

      beforeEach(() => {
        listenerSpy = createSpy();

        subject.addListener("message", listenerSpy);
      });

      it("should not call listener yet", () => {
        expect(listenerSpy.called).to.be.false;
      });

      it("should call the listener when a virtual method is invoked", () => {
        subject.log("test");
        expect(listenerSpy.calledOnce).to.be.true;
        expect(listenerSpy.getCall(0).args).to.eql([
          { console: { method: "log", arguments: ["test"] } },
        ]);
      });
    });

    describe("for any other event name", () => {
      it("should throw an error", () => {
        expect(() => {
          subject.addListener("contrived", () => {});
        }).to.throw(/unknown event name/);
      });
    });
  });

  describe(".removeListener(event, listener", () => {
    describe("for message events", () => {
      describe("when the listener is subscribed", () => {
        let listenerSpy;

        beforeEach(() => {
          listenerSpy = createSpy();
          subject.addListener("message", listenerSpy);
        });

        it("should remove it", () => {
          subject.removeListener("message", listenerSpy);
          subject.log("test");
          expect(listenerSpy.called).to.be.false;
        });
      });

      describe("when the listener is not subscribed", () => {
        it("should do nothing");
      });
    });

    describe("for any other event name", () => {
      it("should throw an error", () => {
        expect(() => {
          subject.removeListener("contrived", () => {});
        }).to.throw(/unknown event name/);
      });
    });
  });
});
